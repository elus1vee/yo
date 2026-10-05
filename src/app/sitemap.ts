import type { MetadataRoute } from "next";
import {
  getLegalSlugs,
  getNewsList,
  getProductSitemapEntries,
} from "@/lib/mock-data";
import { SITE_URL } from "@/lib/seo";

// Reads the database, so it can't be generated at build time.
export const dynamic = "force-dynamic";

const staticPaths = ["/", "/catalog", "/news", "/about", "/contacts"];

/** Every indexable page. Built from the same data the pages are generated from. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
  const [productEntries, news] = await Promise.all([
    getProductSitemapEntries(),
    getNewsList(),
  ]);

  return [
    ...staticPaths.map((path) => ({ url: url(path) })),
    ...productEntries.map((p) => ({
      url: url(`/catalog/${p.slug}`),
      lastModified: p.updatedAt,
    })),
    ...news.map((article) => ({
      url: url(article.href),
      lastModified: article.dateTime,
    })),
    ...getLegalSlugs().map((slug) => ({ url: url(`/legal/${slug}`) })),
  ];
}
