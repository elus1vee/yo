import type { MetadataRoute } from "next";
import {
  getLegalSlugs,
  getNewsArticle,
  getNewsSlugs,
  getProductSlugs,
} from "@/lib/mock-data";
import { SITE_URL } from "@/lib/seo";

const staticPaths = ["/", "/catalog", "/news", "/about", "/contacts"];

/** Every indexable page. Built from the same data the pages are generated from. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

  return [
    ...staticPaths.map((path) => ({ url: url(path) })),
    ...getProductSlugs().map((slug) => ({ url: url(`/catalog/${slug}`) })),
    ...getNewsSlugs().map((slug) => ({
      url: url(`/news/${slug}`),
      lastModified: getNewsArticle(slug)?.dateTime,
    })),
    ...getLegalSlugs().map((slug) => ({ url: url(`/legal/${slug}`) })),
  ];
}
