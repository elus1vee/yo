import { cn } from "@/lib/utils";

/** Copy that differs between the mobile and desktop mockups. */
export interface ResponsiveCopy {
  /** Shown from the `tablet` breakpoint up. */
  desktop?: string;
  /** Shown below `tablet`. */
  mobile?: string;
}

export type Copy = string | ResponsiveCopy;

interface ResponsiveTextProps {
  text: Copy;
  as?: "span" | "p";
  className?: string;
}

/**
 * Renders the right wording per breakpoint (the mockups shorten some
 * texts on mobile). A plain string renders once; a mobile text that is a
 * prefix of the desktop one renders once with a hidden tail; a missing side renders
 * nothing on that side, so no empty element is left behind.
 */
export function ResponsiveText({
  text,
  as: Tag = "span",
  className,
}: ResponsiveTextProps) {
  const { desktop, mobile } =
    typeof text === "string" ? { desktop: text, mobile: text } : text;
  const show = Tag === "span" ? "tablet:inline" : "tablet:block";

  if (desktop === mobile) {
    return desktop ? <Tag className={className}>{desktop}</Tag> : null;
  }

  // "Любимое" / "Любимое у покупателей": keep one continuous string in the
  // DOM (crawlers, copy/paste) and only hide the tail on mobile.
  if (mobile && desktop && desktop.startsWith(mobile)) {
    return (
      <Tag className={className}>
        {mobile}
        <span className="tablet:inline hidden">
          {desktop.slice(mobile.length)}
        </span>
      </Tag>
    );
  }

  return (
    <>
      {mobile && <Tag className={cn(className, "tablet:hidden")}>{mobile}</Tag>}
      {desktop && (
        <Tag className={cn(className, "hidden", show)}>{desktop}</Tag>
      )}
    </>
  );
}
