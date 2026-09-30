import type { Copy } from "@/components/ui/responsive-text";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * schema.org JSON-LD builders. Kept separate from lib/seo.ts (which builds
 * Next's own `Metadata`/Open Graph) since these are plain data objects
 * rendered via <JsonLd>, not part of the Metadata API.
 */

export const copyToText = (copy: Copy): string =>
  typeof copy === "string" ? copy : (copy.desktop ?? copy.mobile ?? "");

const absoluteUrl = (path: string) =>
  path.startsWith("http")
    ? path
    : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export interface OrganizationInfo {
  logo?: string;
  phone: string;
  email: string;
  address: string;
  /** Social/marketplace profile URLs (Footer's "Соцсети" links). */
  sameAs: string[];
}

/** Emitted once per page (site layout) — identifies the brand for search engines. */
export function organizationJsonLd(info: OrganizationInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    ...(info.logo ? { logo: absoluteUrl(info.logo) } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: info.phone,
      email: info.email,
      areaServed: "BY",
      availableLanguage: ["ru"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: info.address,
      addressCountry: "BY",
    },
    ...(info.sameAs.length > 0 ? { sameAs: info.sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export interface BreadcrumbEntry {
  name: string;
  /** Path of this crumb; omitted for the current page's own (last) crumb. */
  path?: string;
}

export function breadcrumbListJsonLd(items: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export interface ProductJsonLdInput {
  name: string;
  description?: string;
  image?: string;
  path: string;
  category?: string;
}

/**
 * No `offers` block: products aren't sold or priced on this site (see
 * "Где купить" — marketplaces/retail only), and a fabricated price would be
 * worse than none. Google simply won't render a price-carousel rich result;
 * the schema itself stays valid.
 */
export function productJsonLd(input: ProductJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: [absoluteUrl(input.image)] } : {}),
    url: absoluteUrl(input.path),
    brand: { "@type": "Brand", name: SITE_NAME },
    ...(input.category ? { category: input.category } : {}),
  };
}

export interface ArticleJsonLdInput {
  headline: string;
  description?: string;
  image?: string;
  path: string;
  datePublished: string;
  publisherLogo?: string;
}

/** No byline field on News (see collections/News.ts) — the brand is the author. */
export function newsArticleJsonLd(input: ArticleJsonLdInput) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.headline,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: [absoluteUrl(input.image)] } : {}),
    datePublished: input.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      ...(input.publisherLogo
        ? {
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl(input.publisherLogo),
            },
          }
        : {}),
    },
  };
}
