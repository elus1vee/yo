/**
 * Fills a fresh database with enough content that every page has something
 * to show: sample products and news, plus the Header/Footer/Partners/About/
 * Contacts globals (their fields are required, so the site 500s without
 * them). Safe to re-run — it looks documents up by slug/name first and
 * updates them instead of creating duplicates.
 *
 * Run with `npm run seed` (wraps `payload run src/seed.ts`).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getCms } from "./lib/payload";
import type { Media, News, Product } from "./payload-types";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../public");

/** Minimal Lexical doc the richText field expects: one paragraph per string. */
function paragraphs(...lines: string[]): NonNullable<Product["description"]> {
  return {
    root: {
      type: "root",
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
      children: lines.map((text) => ({
        type: "paragraph",
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            version: 1,
          },
        ],
      })),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  };
}

async function upload(
  payload: Awaited<ReturnType<typeof getCms>>,
  opts: {
    filename: string;
    alt: string;
  },
): Promise<Media> {
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: opts.filename } },
    limit: 1,
  });
  if (existing.docs[0]) return existing.docs[0];

  const filePath = path.join(publicDir, "demo", opts.filename);
  const data = await fs.readFile(filePath);
  return payload.create({
    collection: "media",
    data: { alt: opts.alt },
    file: {
      data,
      mimetype: "image/jpeg",
      name: opts.filename,
      size: data.byteLength,
    },
  });
}

/**
 * Payload's create/update types resolve per literal collection slug, so a
 * generic helper taking `"products" | "news"` can't type-check `data`
 * against either shape — two thin wrappers instead of one generic function.
 */
type NewDoc<T> = Omit<T, "id" | "slug" | "updatedAt" | "createdAt" | "_status">;

async function upsertProduct(
  payload: Awaited<ReturnType<typeof getCms>>,
  slug: string,
  data: NewDoc<Product>,
) {
  const existing = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  if (existing.docs[0]) {
    return payload.update({
      collection: "products",
      id: existing.docs[0].id,
      data,
      draft: false,
    });
  }
  return payload.create({
    collection: "products",
    data: { slug, ...data },
    draft: false,
  });
}

async function upsertNews(
  payload: Awaited<ReturnType<typeof getCms>>,
  slug: string,
  data: NewDoc<News>,
) {
  const existing = await payload.find({
    collection: "news",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  if (existing.docs[0]) {
    return payload.update({
      collection: "news",
      id: existing.docs[0].id,
      data,
      draft: false,
    });
  }
  return payload.create({
    collection: "news",
    data: { slug, ...data },
    draft: false,
  });
}

async function main() {
  const payload = await getCms();

  // --- Media --------------------------------------------------------------
  const peachPhoto = await upload(payload, {
    filename: "pack-peach.jpeg",
    alt: "Наполнитель Йо! TOFU Peach — упаковка",
  });
  const lavenderPhoto = await upload(payload, {
    filename: "pack-lavender.jpeg",
    alt: "Наполнитель Йо! Лаванда — упаковка",
  });

  // --- Products -------------------------------------------------------------
  const products: {
    slug: string;
    title: string;
    featured?: boolean;
    categoryAnimal: ("cats" | "dogs" | "rodents")[];
    categoryType: "litter" | "treats" | "food" | "care" | "home";
    tint: "peach" | "lavender" | "primary" | "neutral";
    subtitle?: string;
    badge?: string;
    images?: number[];
    description?: Product["description"];
    variants?: { volume?: string; scent?: string }[];
    specs?: { weight?: string; volume?: string };
  }[] = [
    {
      slug: "tofu-peach",
      title: "Наполнитель комкующийся Йо! TOFU Peach",
      featured: true,
      categoryAnimal: ["cats"],
      categoryType: "litter",
      tint: "peach",
      subtitle: "комкующийся",
      badge: "Хит",
      images: [peachPhoto.id],
      description: paragraphs(
        "Комкующийся наполнитель на основе тофу с ароматом персика. Быстро формирует плотные комки, не пылит и легко убирается совком. Подходит для ежедневного использования.",
      ),
      variants: [
        { volume: "6 л / 2,5 кг", scent: "Peach" },
        { volume: "12 л / 5 кг", scent: "Peach" },
      ],
      specs: { volume: "6 л / 2,5 кг" },
    },
    {
      slug: "tofu-lavender",
      title: "Наполнитель комкующийся Йо! TOFU Lavender",
      categoryAnimal: ["cats"],
      categoryType: "litter",
      tint: "lavender",
      subtitle: "комкующийся",
      variants: [{ volume: "6 л / 2,5 кг", scent: "Lavender" }],
      specs: { volume: "6 л / 2,5 кг" },
    },
    {
      slug: "tofu-green-tea",
      title: "Наполнитель комкующийся Йо! TOFU Green Tea",
      categoryAnimal: ["cats"],
      categoryType: "litter",
      tint: "primary",
      subtitle: "комкующийся",
      variants: [{ volume: "6 л / 2,5 кг", scent: "Green tea" }],
      specs: { volume: "6 л / 2,5 кг" },
    },
    {
      slug: "silica-lavender",
      title: "Наполнитель силикагелевый Йо! Лаванда",
      featured: true,
      categoryAnimal: ["cats"],
      categoryType: "litter",
      tint: "lavender",
      subtitle: "силикагель",
      images: [lavenderPhoto.id],
      variants: [
        { volume: "4 л" },
        { volume: "8 л" },
        { volume: "12 л / 4,5 кг" },
      ],
      specs: { volume: "12 л / 4,5 кг" },
    },
    {
      slug: "wood-rodents",
      title: "Наполнитель древесный Йо! для грызунов",
      categoryAnimal: ["rodents"],
      categoryType: "litter",
      tint: "primary",
      subtitle: "древесный",
      specs: { volume: "5 л" },
    },
    {
      slug: "bull-root",
      title: "Лакомства для собак Йо! Бычий корень",
      featured: true,
      categoryAnimal: ["dogs"],
      categoryType: "treats",
      tint: "neutral",
      subtitle: "сушёное",
      variants: [{ volume: "100 г" }, { volume: "250 г" }],
      specs: { weight: "100 г" },
    },
    {
      slug: "chicken-papaya",
      title: "Лакомства для кошек Йо! Курица и папайя",
      categoryAnimal: ["cats"],
      categoryType: "treats",
      tint: "peach",
      specs: { weight: "50 г" },
    },
    {
      slug: "dry-lamb-cats",
      title: "Корм сухой Йо! для кошек, ягнёнок",
      categoryAnimal: ["cats"],
      categoryType: "food",
      tint: "lavender",
      specs: { weight: "1,5 кг" },
    },
    {
      slug: "dry-turkey-dogs",
      title: "Корм сухой Йо! для собак, индейка",
      categoryAnimal: ["dogs"],
      categoryType: "food",
      tint: "primary",
      specs: { weight: "2 кг" },
    },
    {
      slug: "balm",
      title: "Бальзам-кондиционер Йо! для всех типов шерсти",
      featured: true,
      categoryAnimal: ["cats", "dogs"],
      categoryType: "care",
      tint: "primary",
      specs: { volume: "500 мл" },
    },
    {
      slug: "shampoo",
      title: "Шампунь гипоаллергенный Йо!",
      categoryAnimal: ["cats", "dogs"],
      categoryType: "care",
      tint: "lavender",
      specs: { volume: "250 мл" },
    },
    {
      slug: "odor-spray",
      title: "Спрей-нейтрализатор запаха Йо! для дома",
      categoryAnimal: ["cats", "dogs", "rodents"],
      categoryType: "home",
      tint: "neutral",
      specs: { volume: "300 мл" },
    },
  ];

  const productIds = new Map<string, number>();
  for (const { slug, ...data } of products) {
    const doc = await upsertProduct(payload, slug, data);
    productIds.set(slug, doc.id as number);
  }
  console.log(`✓ ${products.length} products`);

  // --- News -----------------------------------------------------------------
  const news: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    tint: "peach" | "lavender" | "primary" | "neutral";
    publishedAt: string;
    relatedProduct?: string;
    cover?: number;
    content: News["content"];
  }[] = [
    {
      slug: "tofu-three-scents",
      title: "Йо! TOFU выходит в трёх ароматах",
      excerpt:
        "К классическому TOFU добавились Lavender и Green Tea — мягче, чем прежде.",
      category: "продукт",
      tint: "peach",
      publishedAt: "2026-09-12",
      relatedProduct: "tofu-peach",
      cover: peachPhoto.id,
      content: paragraphs(
        "Комкующийся наполнитель Йо! TOFU уже несколько лет остаётся одним из самых спокойных решений в линейке — мягкая текстура, минимум пыли и быстрое формирование комков. С этого месяца к классическому аромату добавляются ещё два: Lavender и Green Tea.",
        "Оба новых аромата подбирались с расчётом на чувствительных животных — без резких парфюмерных нот, только лёгкий природный оттенок. Формула самого наполнителя не изменилась: тот же состав на основе тофу, та же скорость впитывания.",
        "Обновлённая линейка уже поступает в зоомагазины-партнёры и будет доступна на маркетплейсах в течение сентября. Объём упаковки остаётся прежним — 6 л / 2,5 кг.",
      ),
    },
    {
      slug: "ph-litter-tests",
      title: "Наполнитель-индикатор pH: первые тесты",
      excerpt:
        "Показываем ранние образцы наполнителя, меняющего цвет по pH мочи.",
      category: "разработка",
      tint: "primary",
      publishedAt: "2026-08-28",
      content: paragraphs(
        "Показываем ранние образцы наполнителя, меняющего цвет по pH мочи.",
      ),
    },
    {
      slug: "expo-minsk",
      title: "«Йо!» на выставке зоотоваров в Минске",
      excerpt: "Показали новую линейку косметики и пообщались с зоомагазинами.",
      category: "событие",
      tint: "lavender",
      publishedAt: "2026-08-15",
      content: paragraphs(
        "Показали новую линейку косметики и пообщались с зоомагазинами.",
      ),
    },
    {
      slug: "dog-treats-batch",
      title: "Новая партия лакомств для собак",
      excerpt: "Бычий корень теперь в двух форматах — 100 г и 250 г.",
      category: "продукт",
      tint: "neutral",
      publishedAt: "2026-08-03",
      relatedProduct: "bull-root",
      content: paragraphs(
        "Бычий корень теперь в двух форматах — 100 г и 250 г.",
      ),
    },
    {
      slug: "kitten-litter-guide",
      title: "Как выбрать наполнитель для котёнка",
      excerpt:
        "Разбираем разницу между комкующимся и силикагелевым наполнителем.",
      category: "советы",
      tint: "peach",
      publishedAt: "2026-07-22",
      content: paragraphs(
        "Разбираем разницу между комкующимся и силикагелевым наполнителем.",
      ),
    },
    {
      slug: "korona-network",
      title: "Йо! теперь в сети «Корона»",
      excerpt:
        "Полная линейка наполнителей и лакомств доступна в 40 магазинах.",
      category: "дистрибуция",
      tint: "primary",
      publishedAt: "2026-07-09",
      content: paragraphs(
        "Полная линейка наполнителей и лакомств доступна в 40 магазинах.",
      ),
    },
    {
      slug: "derm-test",
      title: "Косметика Йо! прошла дерматологический тест",
      excerpt:
        "Бальзам-кондиционер и шампунь протестированы независимой лабораторией.",
      category: "продукт",
      tint: "lavender",
      publishedAt: "2026-06-18",
      relatedProduct: "balm",
      content: paragraphs(
        "Бальзам-кондиционер и шампунь протестированы независимой лабораторией.",
      ),
    },
  ];

  for (const { slug, relatedProduct, ...data } of news) {
    await upsertNews(payload, slug, {
      ...data,
      relatedProduct: relatedProduct
        ? productIds.get(relatedProduct)
        : undefined,
    });
  }
  console.log(`✓ ${news.length} news articles`);

  // --- Globals ----------------------------------------------------------
  await payload.updateGlobal({
    slug: "header",
    data: {
      menuItems: [
        { label: "Товары", href: "/catalog" },
        { label: "О нас", href: "/about" },
        { label: "Новости", href: "/news" },
        { label: "Контакты", href: "/contacts" },
      ],
      messengers: [
        { kind: "telegram", href: "#" },
        { kind: "whatsapp", href: "#" },
        { kind: "viber", href: "#" },
      ],
    },
  });

  await payload.updateGlobal({
    slug: "footer",
    data: {
      requisites: [
        { line: "ООО «Клэрити», УНП 191878316" },
        { line: "г. Минск, ул. Лещинского, 8-2" },
      ],
      socials: [
        { label: "Instagram", href: "#" },
        { label: "Telegram", href: "#" },
        { label: "VK", href: "#" },
      ],
    },
  });

  await payload.updateGlobal({
    slug: "contacts",
    data: {
      intro: {
        eyebrow: "Контакты",
        title: "Свяжитесь с нами",
        description:
          "Вопросы о товарах, сотрудничестве и поставках — ответим в рабочие часы.",
      },
      address: "г. Минск, ул. Лещинского, 8-2",
      phone: "+375 29 657 93 71",
      phoneSecond: "+375 29 620 96 52",
      email: "info@clarity.by",
    },
  });

  await payload.updateGlobal({
    slug: "about",
    data: {
      intro: {
        eyebrow: "О компании",
        title: "Делаем товары, за которыми стоит наблюдение",
        description:
          "«Йо!» — белорусская марка товаров для кошек, собак и грызунов. Наполнители, лакомства, корма и косметика производятся ООО «Клэрити» в Минске — с вниманием к составу и здоровью питомца в каждой линейке.",
      },
      production: {
        title: "Производство и команда",
        items: [
          {
            tint: "peach",
            text: "Собственная площадка в Минске — от смешивания сырья до фасовки готовой продукции.",
          },
          {
            tint: "lavender",
            text: "Технологи и ветеринарные консультанты проверяют каждую новую рецептуру перед запуском.",
          },
          {
            tint: "primary",
            text: "Контроль качества на каждом этапе — от входного сырья до партии на складе.",
          },
        ],
      },
      certificates: {
        title: "Сертификаты и стандарты",
        items: [
          {
            title: "СТБ",
            description: "Соответствие национальным стандартам качества.",
            tint: "primary",
          },
          {
            title: "Ветеринарный контроль",
            description: "Проверка каждой партии перед отгрузкой.",
            tint: "peach",
          },
          {
            title: "ISO 9001",
            description: "Система менеджмента качества производства.",
            tint: "lavender",
          },
          {
            title: "Дерматологический тест",
            description: "Косметика протестирована независимой лабораторией.",
            tint: "neutral",
          },
        ],
      },
      whereToBuy: {
        title: "Где купить",
        aside:
          "товары «Йо!» доступны на маркетплейсах, в сетях и через доставку",
      },
    },
  });

  await payload.updateGlobal({
    slug: "partners",
    data: {
      partners: [
        { name: "Wildberries", tint: "peach" },
        { name: "Яндекс Маркет", tint: "lavender" },
        { name: "Евроопт", tint: "primary" },
        { name: "Корона", tint: "neutral" },
        { name: "Едоставка", tint: "peach" },
      ],
    },
  });
  console.log("✓ globals (header, footer, contacts, about, partners)");

  // --- Admin user -------------------------------------------------------
  const { totalDocs } = await payload.count({ collection: "users" });
  if (totalDocs === 0) {
    const email = "admin@yo.by";
    const password = "ChangeMe123!";
    await payload.create({ collection: "users", data: { email, password } });
    console.log(
      `✓ admin user created — ${email} / ${password} (change this password)`,
    );
  } else {
    console.log("• admin user already exists, skipped");
  }
}

// `payload run` resolves its dynamic import() as soon as this module's top
// level finishes, then exits the process — so the seed must be awaited here
// (top-level await), not just kicked off, or the process exits before any
// of it runs.
try {
  await main();
  console.log("Seed complete.");
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
