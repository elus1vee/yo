import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // internal preview pages (also marked noindex)
      disallow: ["/ui-kit", "/design-system", "/blocks"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
