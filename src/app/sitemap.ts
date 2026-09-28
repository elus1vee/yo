import type { MetadataRoute } from "next";
import { getLegalSlugs, getNewsList, getProductSlugs } from "@/lib/mock-data";
import { SITE_URL } from "@/lib/seo";

const staticPaths = ["/", "/catalog", "/news", "/about", "/contacts"];

/** Every indexable page. Built from the same data the pages are generated from. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
  const [productSlugs, news] = await Promise.all([
    getProductSlugs(),
    getNewsList(),
  ]);

  return [
    ...staticPaths.map((path) => ({ url: url(path) })),
    ...productSlugs.map((slug) => ({ url: url(`/catalog/${slug}`) })),
    ...news.map((article) => ({
      url: url(article.href),
      lastModified: article.dateTime,
    })),
    ...getLegalSlugs().map((slug) => ({ url: url(`/legal/${slug}`) })),
  ];
}
