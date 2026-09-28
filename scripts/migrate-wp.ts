/**
 * One-time content migration: clarity.by (WordPress + WooCommerce) →
 * Payload. Reads the public WP REST API — everything used here is served
 * unauthenticated (/wp-json/wc/store/v1 for products/images, /wp-json/wp/v2/
 * product for Yoast SEO meta, /wp-json/wp/v2/product_cat for categories), so
 * no application password/consumer key is needed. If the store has
 * unpublished/draft products you also want migrated, those don't show up on
 * these public endpoints — see the report's "Not done" note.
 *
 * Usage:
 *   payload run scripts/migrate-wp.ts                    # dry run (default)
 *   payload run scripts/migrate-wp.ts -- --commit         # writes to the DB
 *   payload run scripts/migrate-wp.ts -- --commit --limit=5
 *
 * Idempotent: products are matched by `wpId`, media by `sourceUrl`,
 * redirects by `from` — re-running updates instead of duplicating. Category
 * → categoryAnimal/categoryType mapping lives in
 * migrate-wp.category-map.json, next to this file, edited separately from
 * the code — re-read fresh on every run.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getCms } from "../src/lib/payload";
import type { Product } from "../src/payload-types";
import {
  htmlToLexical,
  isEmptyLexicalDoc,
  type PayloadRichText,
} from "./lib/html-to-lexical";
import { slugify } from "./lib/transliterate";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// CLI / config
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const COMMIT = args.includes("--commit");
const LIMIT = (() => {
  const flag = args.find((a) => a.startsWith("--limit="));
  return flag ? Number(flag.slice("--limit=".length)) : undefined;
})();
const WP_BASE = (
  args.find((a) => a.startsWith("--base-url="))?.slice("--base-url=".length) ??
  process.env.WP_BASE_URL ??
  "https://clarity.by"
).replace(/\/+$/, "");

type Animal = "cats" | "dogs" | "rodents";
type CategoryType = "litter" | "treats" | "food" | "care" | "home";
interface CategoryRule {
  animal?: Animal;
  type?: CategoryType;
  subtitle?: string;
  skip?: boolean;
}

async function loadCategoryMap(): Promise<Record<string, CategoryRule>> {
  const raw = await fs.readFile(
    path.join(dirname, "migrate-wp.category-map.json"),
    "utf8",
  );
  const parsed = JSON.parse(raw) as Record<
    string,
    CategoryRule | string[] | undefined
  >;
  delete parsed._comment;
  return parsed as Record<string, CategoryRule>;
}

/** Purely cosmetic (card color); WP has no equivalent field — review after import. */
const TINT_BY_TYPE: Record<CategoryType, NonNullable<Product["tint"]>> = {
  litter: "primary",
  treats: "peach",
  food: "lavender",
  care: "neutral",
  home: "primary",
};

// ---------------------------------------------------------------------------
// WP REST types (only the fields this script reads)
// ---------------------------------------------------------------------------

interface WpCategoryRef {
  id: number;
  slug: string;
  name: string;
}
interface WpImage {
  id: number;
  src: string;
  alt: string;
}
interface WpStoreProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  images: WpImage[];
  categories: WpCategoryRef[];
}
interface YoastMeta {
  title?: string;
  description?: string;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return (await res.json()) as T;
}

async function fetchAllPages<T>(
  urlFor: (page: number) => string,
  perPage: number,
): Promise<T[]> {
  const all: T[] = [];
  for (let page = 1; ; page++) {
    const batch = await fetchJson<T[]>(urlFor(page));
    all.push(...batch);
    if (batch.length < perPage) break;
  }
  return all;
}

const fetchAllProducts = () =>
  fetchAllPages<WpStoreProduct>(
    (page) =>
      `${WP_BASE}/wp-json/wc/store/v1/products?page=${page}&per_page=50`,
    50,
  );

async function fetchAllSeoMeta(): Promise<Map<number, YoastMeta>> {
  const rows = await fetchAllPages<{ id: number; yoast_head_json?: YoastMeta }>(
    (page) =>
      `${WP_BASE}/wp-json/wp/v2/product?page=${page}&per_page=50&_fields=id,yoast_head_json`,
    50,
  );
  return new Map(rows.map((r) => [r.id, r.yoast_head_json ?? {}]));
}

// ---------------------------------------------------------------------------
// Category mapping
// ---------------------------------------------------------------------------

interface Mapped {
  animals: Animal[];
  type?: CategoryType;
  subtitle?: string;
  unresolvedSlugs: string[];
}

function mapCategories(
  categories: WpCategoryRef[],
  rules: Record<string, CategoryRule>,
): Mapped {
  const animals = new Set<Animal>();
  let type: CategoryType | undefined;
  let subtitle: string | undefined;
  const unresolvedSlugs: string[] = [];

  for (const cat of categories) {
    const rule = rules[cat.slug];
    if (!rule) {
      unresolvedSlugs.push(cat.slug);
      continue;
    }
    if (rule.skip) continue;
    if (rule.animal) animals.add(rule.animal);
    if (rule.type && !type) type = rule.type;
    if (rule.subtitle && !subtitle) subtitle = rule.subtitle;
  }
  return { animals: [...animals], type, subtitle, unresolvedSlugs };
}

// ---------------------------------------------------------------------------
// Per-product plan (pure — no I/O beyond what's passed in)
// ---------------------------------------------------------------------------

interface Plan {
  wp: WpStoreProduct;
  oldPath: string;
  skipReason?: string;
  slug?: string;
  animals?: Animal[];
  type?: CategoryType;
  subtitle?: string;
  description?: PayloadRichText;
  seo?: YoastMeta;
}

function planProduct(
  wp: WpStoreProduct,
  rules: Record<string, CategoryRule>,
  seo: YoastMeta | undefined,
  takenSlugs: Set<string>,
): Plan {
  const oldPath = new URL(wp.permalink).pathname;
  const { animals, type, subtitle, unresolvedSlugs } = mapCategories(
    wp.categories,
    rules,
  );
  const unresolvedNote =
    unresolvedSlugs.length > 0
      ? ` (неизвестные категории: ${unresolvedSlugs.join(", ")})`
      : "";

  if (animals.length === 0)
    return {
      wp,
      oldPath,
      skipReason: `нет категории животного (кошки/собаки/грызуны)${unresolvedNote}`,
    };
  if (!type)
    return {
      wp,
      oldPath,
      skipReason: `нет типа товара (наполнители/лакомства/корма/косметика/для дома)${unresolvedNote}`,
    };

  const description = htmlToLexical(wp.description || wp.short_description);
  if (isEmptyLexicalDoc(description))
    return { wp, oldPath, skipReason: "пустое описание" };

  const base = slugify(wp.name) || `product-${wp.id}`;
  let slug = base;
  for (let n = 2; takenSlugs.has(slug); n++) slug = `${base}-${n}`;
  takenSlugs.add(slug);

  return { wp, oldPath, slug, animals, type, subtitle, description, seo };
}

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------

interface MediaResult {
  id: number;
  created: boolean;
}

async function uploadOrReuseMedia(
  payload: Awaited<ReturnType<typeof getCms>>,
  img: WpImage,
  productName: string,
): Promise<MediaResult | undefined> {
  const existing = await payload.find({
    collection: "media",
    where: { sourceUrl: { equals: img.src } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs[0]) return { id: existing.docs[0].id, created: false };

  let res: Response;
  try {
    res = await fetch(new URL(img.src).href);
  } catch (err) {
    console.warn(
      `      ! не удалось скачать ${img.src}: ${(err as Error).message}`,
    );
    return undefined;
  }
  if (!res.ok) {
    console.warn(`      ! HTTP ${res.status} при скачивании ${img.src}`);
    return undefined;
  }
  const data = Buffer.from(await res.arrayBuffer());
  const name = decodeURIComponent(
    img.src.split("/").pop() ?? `image-${img.id}.jpg`,
  );
  const doc = await payload.create({
    collection: "media",
    data: { alt: img.alt || productName, sourceUrl: img.src },
    file: {
      data,
      mimetype: res.headers.get("content-type") ?? "image/jpeg",
      name,
      size: data.byteLength,
    },
  });
  return { id: doc.id as number, created: true };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(
    `Источник: ${WP_BASE}   Режим: ${COMMIT ? "COMMIT (пишу в БД)" : "DRY RUN (только отчёт)"}`,
  );
  if (LIMIT) console.log(`Ограничение: первые ${LIMIT} товаров`);
  console.log();

  const rules = await loadCategoryMap();
  const [allProducts, seoByWpId] = await Promise.all([
    fetchAllProducts(),
    fetchAllSeoMeta(),
  ]);
  const wpProducts = LIMIT ? allProducts.slice(0, LIMIT) : allProducts;
  console.log(
    `Найдено товаров в WordPress: ${allProducts.length}` +
      (LIMIT ? ` (обрабатываю ${wpProducts.length})` : ""),
  );

  const payload = await getCms();
  const takenSlugs = new Set<string>();
  const plans = wpProducts.map((wp) =>
    planProduct(wp, rules, seoByWpId.get(wp.id), takenSlugs),
  );

  const ready = plans.filter((p) => !p.skipReason);
  const skipped = plans.filter((p) => p.skipReason);

  // Even in dry run, figure out create-vs-update by looking the wpId up —
  // that's a read, it doesn't write anything.
  const existingIds = new Map<number, number>(); // wpId -> Payload doc id
  {
    const { docs } = await payload.find({
      collection: "products",
      where: { wpId: { exists: true } },
      limit: 0,
      depth: 0,
      select: { wpId: true },
      overrideAccess: true,
    });
    for (const d of docs) if (d.wpId != null) existingIds.set(d.wpId, d.id);
  }
  const toCreate = ready.filter((p) => !existingIds.has(p.wp.id));
  const toUpdate = ready.filter((p) => existingIds.has(p.wp.id));
  const imageCount = ready.reduce((n, p) => n + p.wp.images.length, 0);

  console.log(`  создать:    ${toCreate.length}`);
  console.log(`  обновить:   ${toUpdate.length}`);
  console.log(`  пропустить: ${skipped.length}`);
  console.log(
    `  картинок к переносу (с учётом повторов между товарами): ${imageCount}`,
  );
  console.log();

  if (skipped.length > 0) {
    console.log("Пропущенные (и почему):");
    for (const p of skipped)
      console.log(`  · [${p.wp.id}] ${p.wp.name} — ${p.skipReason}`);
    console.log();
  }

  if (!COMMIT) {
    console.log("Первые 10 из того, что будет создано/обновлено:");
    for (const p of [...toCreate, ...toUpdate].slice(0, 10)) {
      const action = existingIds.has(p.wp.id) ? "ОБНОВИТЬ" : "СОЗДАТЬ";
      console.log(
        `  · [${p.wp.id}] ${action} slug="${p.slug}" животные=${p.animals!.join(",")} ` +
          `тип=${p.type} подзаголовок=${p.subtitle ?? "—"} картинок=${p.wp.images.length} ` +
          `старый URL=${p.oldPath}`,
      );
    }
    if (ready.length > 10) console.log(`  … и ещё ${ready.length - 10}`);
    console.log();
    console.log(
      "Это был dry run — в базу ничего не записано. Повторите с --commit, чтобы перенести.",
    );
    return;
  }

  // --- Commit ---------------------------------------------------------
  let mediaCreated = 0;
  let mediaReused = 0;
  let redirectsCreated = 0;
  let redirectsUpdated = 0;
  const done: { wpId: number; name: string; action: string }[] = [];
  const failed: { wpId: number; name: string; error: string }[] = [];

  for (const plan of [...toCreate, ...toUpdate]) {
    try {
      const mediaIds: number[] = [];
      for (const img of plan.wp.images) {
        const result = await uploadOrReuseMedia(payload, img, plan.wp.name);
        if (!result) continue; // logged inside; that image is skipped, not the product
        mediaIds.push(result.id);
        if (result.created) mediaCreated++;
        else mediaReused++;
      }

      const data = {
        title: plan.wp.name,
        slug: plan.slug!,
        wpId: plan.wp.id,
        categoryAnimal: plan.animals!,
        categoryType: plan.type!,
        tint: TINT_BY_TYPE[plan.type!],
        subtitle: plan.subtitle,
        images: mediaIds,
        description: plan.description!,
        meta: {
          title: plan.seo?.title || undefined,
          description: plan.seo?.description || undefined,
          image: mediaIds[0],
        },
      };

      const existingId = existingIds.get(plan.wp.id);
      let productId: number;
      if (existingId) {
        await payload.update({
          collection: "products",
          id: existingId,
          data,
          draft: false,
          overrideAccess: true,
        });
        productId = existingId;
        done.push({ wpId: plan.wp.id, name: plan.wp.name, action: "обновлён" });
      } else {
        const created = await payload.create({
          collection: "products",
          data,
          draft: false,
          overrideAccess: true,
        });
        productId = created.id as number;
        done.push({ wpId: plan.wp.id, name: plan.wp.name, action: "создан" });
      }

      // --- Redirect: old WP URL → new product page -----------------------
      const existingRedirect = await payload.find({
        collection: "redirects",
        where: { from: { equals: plan.oldPath } },
        limit: 1,
        overrideAccess: true,
      });
      const redirectData = {
        from: plan.oldPath,
        to: {
          type: "reference" as const,
          reference: { relationTo: "products" as const, value: productId },
        },
      };
      if (existingRedirect.docs[0]) {
        await payload.update({
          collection: "redirects",
          id: existingRedirect.docs[0].id,
          data: redirectData,
          overrideAccess: true,
        });
        redirectsUpdated++;
      } else {
        await payload.create({
          collection: "redirects",
          data: redirectData,
          overrideAccess: true,
        });
        redirectsCreated++;
      }
    } catch (err) {
      failed.push({
        wpId: plan.wp.id,
        name: plan.wp.name,
        error: (err as Error).message,
      });
    }
  }

  console.log("Готово:");
  console.log(`  товаров перенесено: ${done.length}`);
  console.log(`  товаров с ошибкой:  ${failed.length}`);
  console.log(`  медиа создано:      ${mediaCreated}`);
  console.log(
    `  медиа переиспользовано (уже было по sourceUrl): ${mediaReused}`,
  );
  console.log(`  редиректов создано: ${redirectsCreated}`);
  console.log(`  редиректов обновлено: ${redirectsUpdated}`);
  if (failed.length > 0) {
    console.log();
    console.log("С ошибкой (и почему):");
    for (const f of failed)
      console.log(`  · [${f.wpId}] ${f.name} — ${f.error}`);
  }
}

// `payload run` resolves its dynamic import() (and exits the process) as
// soon as this module's top level finishes — top-level await, not just
// kicking main() off, or the process exits before any of it runs. Same
// gotcha as src/seed.ts.
try {
  await main();
  console.log("\nСкрипт завершён.");
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
