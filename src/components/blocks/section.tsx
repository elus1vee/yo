import { type ReactNode, useId } from "react";
import { ArrowIcon } from "@/components/ui/icons";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button-link";
import { type Copy, ResponsiveText } from "@/components/ui/responsive-text";
import { cn } from "@/lib/utils";

export interface SectionAction {
  label: string;
  /** Shorter label for mobile, where the action is a plain arrow link ("Все"). */
  mobileLabel?: string;
  href: string;
}

/** Horizontal gutters. The home mockup insets 14px on mobile, inner pages 18px. */
const insets = {
  home: "px-3.5 tablet:px-10",
  page: "px-4.5 tablet:px-10",
} as const;

/**
 * Vertical rhythm presets for the sections of inner pages (top / bottom
 * padding, mobile → tablet+). `default` is the home page's.
 */
const rhythms = {
  default: "pb-7 tablet:pb-18",
  /** Sections stacked one after another (About). */
  stack: "pt-2 pb-8 tablet:pt-0 tablet:pb-18",
  /** Last of a stack, before the footer. */
  "stack-end": "pt-2 pb-10 tablet:pt-0 tablet:pb-24",
  /** Main block of a detail page (product), right below the breadcrumbs. */
  detail: "pt-3.5 pb-0 tablet:pt-6 tablet:pb-18",
  /** "Similar items" after a detail block. */
  "detail-end": "pt-8 pb-10 tablet:pt-0 tablet:pb-24",
  /** A form / details block right below the page intro (Contacts). */
  form: "pt-0 pb-10 tablet:pt-4 tablet:pb-18",
} as const;

export interface SectionProps {
  /** Anchor target, e.g. for "#contact" links. */
  id?: string;
  /** May be shorter on mobile: { desktop, mobile }. */
  title?: Copy;
  /**
   * Heading that only screen readers and crawlers get, for sections whose
   * mockup has no visible title (keeps h1 → h2 → h3 unbroken).
   */
  srTitle?: string;
  /** `md` is the smaller heading (h2 token) used on inner pages. */
  titleSize?: "lg" | "md";
  /** Short note to the right of the title (desktop only). */
  aside?: string;
  action?: SectionAction;
  children: ReactNode;
  className?: string;
  /** Horizontal gutters; see `insets`. */
  inset?: keyof typeof insets;
  /** Vertical padding preset; see `rhythms`. */
  rhythm?: keyof typeof rhythms;
  /** Extra classes for the inner container, e.g. a narrower `max-w-[1280px]`. */
  containerClassName?: string;
}

/**
 * Page section: outer gutters (`inset`), vertical padding (`rhythm`), a 1360px
 * container, and an optional heading row. Every home-page block sits in one
 * so the page itself needs no layout classes.
 */
export function Section({
  id,
  title,
  srTitle,
  titleSize = "lg",
  aside,
  action,
  children,
  inset = "home",
  rhythm = "default",
  className,
  containerClassName,
}: SectionProps) {
  const headingId = useId();
  const labelled = Boolean(title || srTitle);

  return (
    <section
      id={id}
      aria-labelledby={labelled ? headingId : undefined}
      className={cn("scroll-mt-24", insets[inset], rhythms[rhythm], className)}
    >
      <div
        className={cn(
          "tablet:gap-7 mx-auto flex max-w-[1360px] flex-col gap-4",
          containerClassName,
        )}
      >
        {srTitle && !title && (
          <h2 id={headingId} className="sr-only">
            {srTitle}
          </h2>
        )}
        {title && (
          <div
            className={cn(
              "tablet:items-end flex items-baseline justify-between gap-6",
              // the home page nudges its title row in by 8px; inner pages don't
              titleSize === "lg" && "px-2",
            )}
          >
            <h2
              id={headingId}
              className={cn(
                "font-heading",
                titleSize === "lg" ? "text-h1" : "text-h2",
              )}
            >
              <ResponsiveText text={title} />
            </h2>
            {aside && (
              <p
                className={cn(
                  "text-text-muted tablet:block hidden leading-[1.55]",
                  // home: short note in a narrow column; inner pages: one line
                  titleSize === "lg" ? "max-w-[340px] text-[15px]" : "text-sm",
                )}
              >
                {aside}
              </p>
            )}
            {action && (
              <>
                <ButtonLink
                  href={action.href}
                  variant="light"
                  size="sm"
                  className="tablet:inline-flex hidden h-12 px-5.5 text-[15px]"
                >
                  {action.label}
                  <ArrowIcon size={17} />
                </ButtonLink>
                <ArrowLink href={action.href} className="tablet:hidden">
                  {action.mobileLabel ?? action.label}
                </ArrowLink>
              </>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
