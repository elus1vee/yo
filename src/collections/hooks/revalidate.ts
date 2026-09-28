import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { safeRevalidatePath } from "../../lib/revalidate";
import type { News, Product } from "../../payload-types";

/**
 * Keeps the public site in step with the admin: without this, a published
 * change only shows up after the next deploy (pages are pre-rendered at
 * build time). Only the pages that actually read this doc are touched —
 * other products/articles that merely list or link to it (home, "related")
 * are refreshed on their own next edit, not instantly; chasing that graph
 * fully wasn't worth the complexity here.
 */

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  previousDoc,
}) => {
  safeRevalidatePath("/");
  safeRevalidatePath("/catalog");
  safeRevalidatePath(`/catalog/${doc.slug}`);
  if (previousDoc?.slug && previousDoc.slug !== doc.slug)
    safeRevalidatePath(`/catalog/${previousDoc.slug}`);
  safeRevalidatePath("/sitemap.xml");
  return doc;
};

export const revalidateProductDelete: CollectionAfterDeleteHook<Product> = ({
  doc,
}) => {
  safeRevalidatePath("/");
  safeRevalidatePath("/catalog");
  if (doc?.slug) safeRevalidatePath(`/catalog/${doc.slug}`);
  safeRevalidatePath("/sitemap.xml");
  return doc;
};

export const revalidateNews: CollectionAfterChangeHook<News> = ({
  doc,
  previousDoc,
}) => {
  safeRevalidatePath("/");
  safeRevalidatePath("/news");
  safeRevalidatePath(`/news/${doc.slug}`);
  if (previousDoc?.slug && previousDoc.slug !== doc.slug)
    safeRevalidatePath(`/news/${previousDoc.slug}`);
  safeRevalidatePath("/sitemap.xml");
  return doc;
};

export const revalidateNewsDelete: CollectionAfterDeleteHook<News> = ({
  doc,
}) => {
  safeRevalidatePath("/");
  safeRevalidatePath("/news");
  if (doc?.slug) safeRevalidatePath(`/news/${doc.slug}`);
  safeRevalidatePath("/sitemap.xml");
  return doc;
};
