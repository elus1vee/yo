import { Fragment } from "react";
import { SafeLink } from "@/components/ui/safe-link";
import { cn } from "@/lib/utils";
import { Section } from "./section";

/** A piece of a paragraph: plain text, or a link. Never HTML. */
export type LegalInline = string | { text: string; href: string };

export interface LegalSectionData {
  /** Anchor id used by the table of contents. */
  id: string;
  title: string;
  /** Each paragraph is a string or a list of inline pieces (text and links). */
  paragraphs: (string | LegalInline[])[];
}

export interface LegalDocumentProps {
  title: string;
  /** e.g. "Действует с 1 января 2026 года". */
  updated?: string;
  /** Heading of the sticky table of contents, e.g. "Оглавление". */
  tocLabel: string;
  sections: LegalSectionData[];
  /** Prefix the headings with "1.", "2.", … */
  numbered?: boolean;
}

function Paragraph({ parts }: { parts: string | LegalInline[] }) {
  const inline = typeof parts === "string" ? [parts] : parts;
  return (
    <>
      {inline.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <SafeLink
            key={i}
            href={part.href}
            className="text-primary hover:text-text underline-offset-2 hover:underline"
          >
            {part.text}
          </SafeLink>
        ),
      )}
    </>
  );
}

/**
 * Plain-text document page (privacy policy, terms). Text is data, rendered
 * as text — never as HTML. Table of contents: sticky card from `lg`, a
 * scrolling row of pills below it.
 */
export function LegalDocument({
  title,
  updated,
  tocLabel,
  sections,
  numbered = true,
}: LegalDocumentProps) {
  return (
    <>
      <Section
        className="tablet:px-10 tablet:pb-4 px-[18px] pt-2 pb-4"
        containerClassName="gap-2 tablet:gap-2"
      >
        <h1 className="font-heading text-h1">{title}</h1>
        {updated && (
          <p className="text-text-muted tablet:text-sm text-[13px]">
            {updated}
          </p>
        )}
      </Section>

      <Section
        className="tablet:px-10 tablet:pt-6 tablet:pb-24 px-[18px] pt-2 pb-10"
        containerClassName="gap-4 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-x-14"
      >
        <nav
          aria-label={tocLabel}
          className="lg:bg-surface flex gap-2 overflow-x-auto pb-1 lg:sticky lg:top-[110px] lg:flex-col lg:gap-1 lg:overflow-visible lg:rounded-md lg:p-5 lg:pb-5"
        >
          <span className="text-text-muted hidden px-3 pb-2.5 text-[11px] font-bold tracking-[0.12em] uppercase lg:block">
            {tocLabel}
          </span>
          {sections.map((section) => (
            <SafeLink
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                "bg-surface text-text flex-none rounded-full px-3.5 py-[9px] text-xs font-semibold whitespace-nowrap transition-colors",
                "focus-visible:shadow-focus-button focus-visible:outline-none",
                "lg:hover:bg-surface-hover lg:rounded-xl lg:bg-transparent lg:px-3 lg:py-2.5 lg:text-sm lg:whitespace-normal",
              )}
            >
              {section.title}
            </SafeLink>
          ))}
        </nav>

        <div className="tablet:gap-8 flex flex-col gap-[26px]">
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className="tablet:gap-3.5 flex scroll-mt-28 flex-col gap-2.5"
            >
              <h2 className="font-heading tablet:text-[26px] text-xl font-medium">
                {numbered ? `${i + 1}. ` : ""}
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph, j) => (
                <p
                  key={j}
                  className={cn(
                    "tablet:text-base tablet:leading-[1.75] text-[15px] leading-[1.65]",
                    j > 0 && "text-text-muted",
                  )}
                >
                  <Paragraph parts={paragraph} />
                </p>
              ))}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
