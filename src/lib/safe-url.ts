/**
 * URL hygiene for data that arrives through props (CMS content, config).
 * React escapes text, but it does NOT block `javascript:` / `data:` URLs in
 * `href`, so every link built from data goes through `safeHref`.
 */

const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Returns `href` unchanged when it is a same-site path ("/catalog"), an
 * anchor ("#contacts"), or an absolute http(s)/mailto/tel URL. Anything
 * else — `javascript:`, `data:`, `vbscript:`, protocol-relative "//host",
 * relative paths without a leading slash — collapses to "#".
 */
export function safeHref(href: string): string {
  const value = href.trim();

  if (value.startsWith("#")) return value;

  if (
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.startsWith("/\\")
  ) {
    return value;
  }

  try {
    // `new URL` strips embedded tabs/newlines the way browsers do, so
    // "java\tscript:..." is parsed as the javascript: protocol and rejected.
    if (ALLOWED_PROTOCOLS.has(new URL(value).protocol)) return value;
  } catch {
    // not an absolute URL
  }

  return "#";
}

/** True for absolute http(s) links, which should open with rel=noopener. */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** "+375 29 657 93 71" -> "tel:+375296579371". Digits and a leading + only. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
