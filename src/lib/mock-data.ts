import { cache } from "react";
import type { CatalogProduct } from "@/components/blocks/catalog-product-card";
import type { LegalSectionData } from "@/components/blocks/legal-document";
import type { NewsCardProps } from "@/components/blocks/news-card";
import type { ProductCardProps } from "@/components/blocks/product-card";
import { getCms } from "@/lib/payload";
import {
  catalogProductOf,
  productCardOf,
  productToView,
  type ProductDetailView,
} from "@/lib/view/product";
import { newsCardOf, newsToView, type NewsArticleView } from "@/lib/view/news";
import type { News, Product } from "@/payload-types";

/**
 * Products and news read from Payload (published documents only — see
 * `access.ts`). The doc → view-prop mapping lives in lib/view/*.ts (pure
 * functions, reused by the Live Preview components); this file is just the
 * queries. Legal pages at the bottom are the one thing still static: this
 * task didn't cover them (see the final report).
 */

/** How many "similar" items to show, on the product and article pages. */
const RELATED_COUNT = 4;

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

/** 4 cards for the home page: featured products first, latest ones fill the rest. */
export async function getFeaturedProducts(
  limit = 4,
): Promise<ProductCardProps[]> {
  const payload = await getCms();
  const featured = await payload.find({
    collection: "products",
    where: { featured: { equals: true } },
    sort: "-createdAt",
    limit,
    overrideAccess: false,
  });
  if (featured.docs.length >= limit) {
    return featured.docs.map(productCardOf);
  }
  const rest = await payload.find({
    collection: "products",
    where: { id: { not_in: featured.docs.map((p) => p.id) } },
    sort: "-createdAt",
    limit: limit - featured.docs.length,
    overrideAccess: false,
  });
  return [...featured.docs, ...rest.docs].map(productCardOf);
}

/** Every published product, for the catalog page's client-side filters. */
export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  const payload = await getCms();
  const { docs } = await payload.find({
    collection: "products",
    sort: "title",
    limit: 200,
    depth: 1,
    overrideAccess: false,
  });
  return docs.map(catalogProductOf);
}

export async function getProductSlugs(): Promise<string[]> {
  const payload = await getCms();
  const { docs } = await payload.find({
    collection: "products",
    limit: 0,
    depth: 0,
    select: { slug: true },
    overrideAccess: false,
  });
  return docs.map((p) => p.slug);
}

/** slug + updatedAt for every product, for the sitemap's `lastModified`. */
export async function getProductSitemapEntries(): Promise<
  { slug: string; updatedAt: string }[]
> {
  const payload = await getCms();
  const { docs } = await payload.find({
    collection: "products",
    limit: 0,
    depth: 0,
    select: { slug: true, updatedAt: true },
    overrideAccess: false,
  });
  return docs.map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
}

/** Same categoryType first, then any other published product, up to `RELATED_COUNT`. */
async function relatedProductsOf(
  categoryType: string,
  excludeId: number,
): Promise<CatalogProduct[]> {
  const payload = await getCms();
  const sameType = await payload.find({
    collection: "products",
    where: {
      and: [
        { categoryType: { equals: categoryType } },
        { id: { not_equals: excludeId } },
      ],
    },
    sort: "-createdAt",
    limit: RELATED_COUNT,
    depth: 1,
    overrideAccess: false,
  });
  if (sameType.docs.length >= RELATED_COUNT)
    return sameType.docs.map(catalogProductOf);

  const rest = await payload.find({
    collection: "products",
    where: {
      and: [
        { id: { not_equals: excludeId } },
        { id: { not_in: sameType.docs.map((p) => p.id) } },
      ],
    },
    sort: "-createdAt",
    limit: RELATED_COUNT - sameType.docs.length,
    depth: 1,
    overrideAccess: false,
  });
  return [...sameType.docs, ...rest.docs].map(catalogProductOf);
}

export interface ProductDetail extends ProductDetailView {
  related: CatalogProduct[];
}

/**
 * Raw doc, for the product page's Live Preview wrapper (and generateMetadata/
 * body below, which also need it) — `cache()` dedupes those calls within one
 * request instead of querying twice.
 */
export const getRawProduct = cache(
  async (slug: string): Promise<Product | undefined> => {
    const payload = await getCms();
    const { docs } = await payload.find({
      collection: "products",
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
      overrideAccess: false,
    });
    return docs[0];
  },
);

export async function getProductDetail(
  slug: string,
): Promise<ProductDetail | undefined> {
  const product = await getRawProduct(slug);
  if (!product) return undefined;

  return {
    ...productToView(product),
    related: await relatedProductsOf(product.categoryType, product.id),
  };
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

/** Latest 3, for the home page (no teaser / category there). */
export async function getLatestNews(limit = 3): Promise<NewsCardProps[]> {
  const payload = await getCms();
  const { docs } = await payload.find({
    collection: "news",
    sort: "-publishedAt",
    limit,
    depth: 1,
    overrideAccess: false,
  });
  return docs.map((a) => newsCardOf(a, false));
}

/** Everything, for the news list (with category and teaser). */
export async function getNewsList(): Promise<NewsCardProps[]> {
  const payload = await getCms();
  const { docs } = await payload.find({
    collection: "news",
    sort: "-publishedAt",
    limit: 200,
    depth: 1,
    overrideAccess: false,
  });
  return docs.map((a) => newsCardOf(a, true));
}

export async function getNewsSlugs(): Promise<string[]> {
  const payload = await getCms();
  const { docs } = await payload.find({
    collection: "news",
    limit: 0,
    depth: 0,
    select: { slug: true },
    overrideAccess: false,
  });
  return docs.map((a) => a.slug);
}

export interface NewsArticlePage extends NewsArticleView {
  related: NewsCardProps[];
}

/**
 * Raw doc, for the article page's Live Preview wrapper (and
 * generateMetadata/body below, which also need it) — `cache()` dedupes those
 * calls within one request instead of querying twice.
 */
export const getRawNewsArticle = cache(
  async (slug: string): Promise<News | undefined> => {
    const payload = await getCms();
    const { docs } = await payload.find({
      collection: "news",
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
      overrideAccess: false,
    });
    return docs[0];
  },
);

export async function getNewsArticle(
  slug: string,
): Promise<NewsArticlePage | undefined> {
  const payload = await getCms();
  const article = await getRawNewsArticle(slug);
  if (!article) return undefined;

  const related = await payload.find({
    collection: "news",
    where: { id: { not_equals: article.id } },
    sort: "-publishedAt",
    limit: RELATED_COUNT,
    depth: 1,
    overrideAccess: false,
  });

  return {
    ...newsToView(article),
    related: related.docs
      .slice(0, RELATED_COUNT - 1)
      .map((a) => newsCardOf(a, false)),
  };
}

// ---------------------------------------------------------------------------
// Legal pages — still static. Out of scope for the Payload wiring (see the
// final report): not one of the pages this task listed, and Payload's
// generic `Pages` collection is ready for them whenever that's next.
// ---------------------------------------------------------------------------

export interface LegalPageData {
  slug: string;
  title: string;
  updated: string;
  sections: LegalSectionData[];
}

const legalPages: LegalPageData[] = [
  {
    slug: "privacy",
    title: "Политика конфиденциальности",
    updated: "Действует с 1 января 2026 года",
    sections: [
      {
        id: "collection",
        title: "Какие данные мы собираем",
        paragraphs: [
          "Мы собираем имя, номер телефона и текст обращения, которые вы указываете в формах на сайте — например, в форме обратной связи или заявке на партнёрство.",
          "Дополнительно фиксируются технические данные посещения: тип устройства и браузера, для улучшения работы сайта.",
        ],
      },
      {
        id: "purpose",
        title: "Цели обработки",
        paragraphs: [
          "Данные используются для ответа на обращения, обработки заявок зоомагазинов-партнёров и информирования о новых товарах, если вы дали на это согласие.",
        ],
      },
      {
        id: "storage",
        title: "Хранение и защита",
        paragraphs: [
          "Персональные данные хранятся на серверах ООО «Клэрити» и защищены от несанкционированного доступа. Срок хранения — не более 3 лет с момента последнего обращения.",
        ],
      },
      {
        id: "rights",
        title: "Ваши права",
        paragraphs: [
          "Вы можете запросить удаление или уточнение своих данных, написав на info@clarity.by. Мы отвечаем на такие запросы в течение 10 рабочих дней.",
        ],
      },
      {
        id: "contacts",
        title: "Контакты",
        paragraphs: [
          [
            "ООО «Клэрити», УНП 191878316, г. Минск, ул. Лещинского, 8-2. Email: ",
            { text: "info@clarity.by", href: "mailto:info@clarity.by" },
            ".",
          ],
        ],
      },
    ],
  },
];

export function getLegalSlugs(): string[] {
  return legalPages.map((p) => p.slug);
}

/** Lookup by array search (not by object key), so odd slugs can't hit prototypes. */
export function getLegalPage(slug: string): LegalPageData | undefined {
  return legalPages.find((p) => p.slug === slug);
}
