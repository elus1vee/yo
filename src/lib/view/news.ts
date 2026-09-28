import type { NewsCardProps } from "@/components/blocks/news-card";
import { typeOptions } from "@/content/catalog";
import { richTextToParagraphs } from "@/lib/rich-text";
import { mediaImage } from "@/lib/view/product";
import type { News } from "@/payload-types";

/** Pure Payload-doc → view-prop mappers for news — see view/product.ts. */

export const READ_MORE = "Читать";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function newsCardOf(
  article: News,
  withCategory: boolean,
): NewsCardProps {
  return {
    title: article.title,
    href: `/news/${article.slug}`,
    date: formatDate(article.publishedAt),
    dateTime: article.publishedAt,
    category: withCategory ? (article.category ?? undefined) : undefined,
    excerpt: withCategory ? article.excerpt : undefined,
    tint: article.tint,
    image: mediaImage(article.cover),
    readMoreLabel: READ_MORE,
  };
}

export interface NewsArticleView {
  slug: string;
  title: string;
  date: string;
  dateTime: string;
  category?: string;
  excerpt: string;
  tint: News["tint"];
  cover?: { src: string; alt: string };
  body: string[];
  product?: { name: string; meta: string; href: string };
}

/** Everything about an article's own fields — not `related` (a separate query). */
export function newsToView(article: News): NewsArticleView {
  const linked =
    article.relatedProduct && typeof article.relatedProduct === "object"
      ? article.relatedProduct
      : undefined;
  const typeLabel = linked
    ? typeOptions.find((t) => t.id === linked.categoryType)?.label.toLowerCase()
    : undefined;
  const paragraphs = richTextToParagraphs(article.content);

  return {
    slug: article.slug,
    title: article.title,
    date: formatDate(article.publishedAt),
    dateTime: article.publishedAt,
    category: article.category ?? undefined,
    excerpt: article.excerpt,
    tint: article.tint,
    cover: mediaImage(article.cover),
    body: paragraphs.length > 0 ? paragraphs : [article.excerpt],
    product:
      linked && linked.specs
        ? {
            name: linked.title,
            meta: [linked.specs.volume, typeLabel].filter(Boolean).join(" · "),
            href: `/catalog/${linked.slug}`,
          }
        : undefined,
  };
}
