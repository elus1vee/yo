import { type ReactNode } from "react";
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

export interface SectionProps {
  /** Anchor target, e.g. for "#contact" links. */
  id?: string;
  /** May be shorter on mobile: { desktop, mobile }. */
  title?: Copy;
  /** Short note to the right of the title (desktop only). */
  aside?: string;
  action?: SectionAction;
  children: ReactNode;
  className?: string;
  /** Extra classes for the inner container, e.g. a narrower `max-w-[1280px]`. */
  containerClassName?: string;
}

/**
 * Page section: outer gutters (40px desktop / 14px mobile), a 1360px
 * container, and an optional heading row. Every home-page block sits in one
 * so the page itself needs no layout classes.
 */
export function Section({
  id,
  title,
  aside,
  action,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "tablet:px-10 tablet:pb-18 scroll-mt-24 px-3.5 pb-7",
        className,
      )}
    >
      <div
        className={cn(
          "tablet:gap-7 mx-auto flex max-w-[1360px] flex-col gap-4",
          containerClassName,
        )}
      >
        {title && (
          <div className="tablet:items-end flex items-baseline justify-between gap-6 px-2">
            <h2 className="font-heading text-h1">
              <ResponsiveText text={title} />
            </h2>
            {aside && (
              <p className="text-text-muted tablet:block hidden max-w-[340px] text-[15px] leading-[1.55]">
                {aside}
              </p>
            )}
            {action && (
              <>
                <ButtonLink
                  href={action.href}
                  variant="light"
                  size="sm"
                  className="tablet:inline-flex hidden h-12 px-[22px] text-[15px]"
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
