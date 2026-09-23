import Link from "next/link";
import { type ComponentProps } from "react";
import { isExternalHref, safeHref } from "@/lib/safe-url";
import { type SafeProps } from "@/lib/utils";

export interface SafeLinkProps extends SafeProps<
  Omit<ComponentProps<typeof Link>, "href">
> {
  /** Path, anchor, or absolute http(s)/mailto/tel URL. Anything else -> "#". */
  href: string;
}

/**
 * next/link for links whose href comes from data. Sanitizes the href and
 * opens external http(s) links in a new tab with `noopener noreferrer`.
 */
export function SafeLink({ href, target, rel, ...props }: SafeLinkProps) {
  const safe = safeHref(href);
  const openInNewTab = target === "_blank" || (!target && isExternalHref(safe));

  return (
    <Link
      href={safe}
      target={openInNewTab ? "_blank" : target}
      rel={
        openInNewTab
          ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
          : rel
      }
      {...props}
    />
  );
}
