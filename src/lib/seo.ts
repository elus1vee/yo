import type { Metadata } from "next";

/**
 * Public origin of the site, used for canonical URLs, Open Graph and the
 * sitemap. TODO: set NEXT_PUBLIC_SITE_URL in the deploy environment — the
 * fallback is a placeholder, not a confirmed domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yo.by"
).replace(/\/+$/, "");

export const SITE_NAME = "Йо!";

export interface PageMetaInput {
  /** Page title; the root template appends " — Йо!" unless `absolute`. */
  title: string;
  description?: string;
  /** Path of the page, e.g. "/catalog"; becomes the canonical URL. */
  path: string;
  /** Use the title as is (it already contains the brand). */
  absolute?: boolean;
  /** Open Graph type; articles also carry their publication date. */
  type?: "website" | "article";
  publishedTime?: string;
}

/**
 * One place that builds per-page metadata. `openGraph` is replaced (not
 * merged) by a page's own value, so siteName / locale are repeated here.
 */
export function pageMetadata({
  title,
  description,
  path,
  absolute,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "ru_BY",
      title,
      description,
      url: path,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
  };
}
