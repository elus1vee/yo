import { SafeLink } from "@/components/ui/safe-link";
import { cn } from "@/lib/utils";
import { Section } from "./section";

export interface BreadcrumbItem {
  label: string;
  /** Omit on the last item: it renders as the current page. */
  href?: string;
  /** Dropped below `tablet` (the mobile mockup shortens the trail). */
  hideOnMobile?: boolean;
}

export interface BreadcrumbsProps {
  /** aria-label of the landmark, e.g. "Хлебные крошки". */
  label: string;
  items: BreadcrumbItem[];
}

/** Breadcrumb trail; scrolls sideways instead of wrapping on narrow screens. */
export function Breadcrumbs({ label, items }: BreadcrumbsProps) {
  return (
    <Section className="tablet:px-10 tablet:pt-5 tablet:pb-0 px-[18px] pt-4 pb-0">
      <nav aria-label={label} className="px-2">
        <ol className="text-text-muted tablet:gap-2 tablet:text-[13px] flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
          {items.map((item, i) => (
            <li
              key={`${item.label}-${i}`}
              className={cn(
                "tablet:gap-2 flex items-center gap-1.5",
                item.hideOnMobile && "tablet:flex hidden",
              )}
            >
              {item.href ? (
                <SafeLink
                  href={item.href}
                  className="hover:text-text focus-visible:shadow-focus-button transition-colors focus-visible:outline-none"
                >
                  {item.label}
                </SafeLink>
              ) : (
                <span aria-current="page" className="text-text font-semibold">
                  {item.label}
                </span>
              )}
              {i < items.length - 1 && <span aria-hidden="true">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </Section>
  );
}
