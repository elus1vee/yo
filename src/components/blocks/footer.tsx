import Image from "next/image";
import { Fragment } from "react";
import { SafeLink } from "@/components/ui/safe-link";
import { cn } from "@/lib/utils";
import { type ImageAsset, type NavItem } from "./types";

export interface FooterColumn {
  title: string;
  links: NavItem[];
  /** Not shown below the `tablet` breakpoint (the mobile mockup drops "Разделы"). */
  hideOnMobile?: boolean;
  /** Lay links out in a wrapping row on mobile (used for social links). */
  rowOnMobile?: boolean;
}

export interface FooterProps {
  /** Cream-colored wordmark for the dark background. */
  yoLogo: ImageAsset;
  clarityLogo: ImageAsset;
  /** Legal entity lines, e.g. ["ООО «Клэрити», УНП 191878316", "г. Минск, …"]. */
  requisites: string[];
  columns: FooterColumn[];
  /** Ready-made line, e.g. "© 2026 «Йо!»". */
  copyright: string;
  legalLinks: NavItem[];
}

export function Footer({
  yoLogo,
  clarityLogo,
  requisites,
  columns,
  copyright,
  legalLinks,
}: FooterProps) {
  return (
    <footer className="tablet:px-10 tablet:pb-10 px-3.5 pb-3.5">
      <div className="bg-surface-inverse text-text-inverse tablet:gap-11 tablet:rounded-xl tablet:p-14 mx-auto flex max-w-[1360px] flex-col gap-6 rounded-lg px-[22px] py-7">
        <div className="tablet:grid-cols-2 tablet:gap-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))]">
          <div className="tablet:gap-5 flex flex-col gap-6">
            <Image
              src={yoLogo.src}
              alt={yoLogo.alt}
              width={yoLogo.width}
              height={yoLogo.height}
              className="tablet:h-10 h-8 w-auto self-start"
            />
            <address className="text-text-inverse-muted tablet:text-sm text-[13px] leading-[1.7] not-italic">
              {requisites.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </address>
            <Image
              src={clarityLogo.src}
              alt={clarityLogo.alt}
              width={clarityLogo.width}
              height={clarityLogo.height}
              className="tablet:size-[53px] size-11"
            />
          </div>

          {columns.map((column) => (
            <div
              key={column.title}
              className={cn(
                "tablet:gap-3 flex flex-col gap-2.5 text-sm",
                column.hideOnMobile && "tablet:flex hidden",
                column.rowOnMobile &&
                  "tablet:flex-col tablet:flex-nowrap flex-row flex-wrap gap-x-4",
              )}
            >
              <h2 className="text-text-inverse-muted tablet:block hidden text-[11px] tracking-[0.14em] uppercase">
                {column.title}
              </h2>
              {column.links.map((link) => (
                <SafeLink
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className="text-text-inverse hover:text-primary-light w-fit transition-colors"
                >
                  {link.label}
                </SafeLink>
              ))}
            </div>
          ))}
        </div>

        <div className="border-divider-inverse text-text-inverse-muted tablet:pt-6 tablet:text-[13px] flex flex-wrap justify-between gap-x-5 gap-y-2 border-t pt-[18px] text-xs">
          <span>{copyright}</span>
          {legalLinks.map((link) => (
            <SafeLink
              key={link.href}
              href={link.href}
              className="hover:text-text-inverse transition-colors"
            >
              {link.label}
            </SafeLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
