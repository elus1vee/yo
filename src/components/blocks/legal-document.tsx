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
        inset="page"
        className="tablet:pb-4 pt-2 pb-4"
        containerClassName="gap-2 tablet:gap-2"
      >
        <h1 className="font-heading text-h1">{title}</h1>
        {updated && <p className="text-text-muted text-small">{updated}</p>}
      </Section>

      <Section
        inset="page"
        className="tablet:pt-6 tablet:pb-24 pt-2 pb-10"
        containerClassName="gap-4 split:grid split:grid-cols-[280px_minmax(0,1fr)] split:items-start split:gap-x-14"
      >
        <nav
          aria-label={tocLabel}
          className="split:bg-surface split:sticky split:top-27.5 split:flex-col split:gap-1 split:overflow-visible split:rounded-md split:p-5 split:pb-5 flex gap-2 overflow-x-auto pb-1"
        >
          <span className="text-text-muted split:block hidden px-3 pb-2.5 text-[11px] font-bold tracking-[0.12em] uppercase">
            {tocLabel}
          </span>
          {sections.map((section) => (
            <SafeLink
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                "bg-surface text-text flex-none rounded-full px-3.5 py-2.25 text-xs font-semibold whitespace-nowrap transition-colors",
                "focus-ring",
                "split:hover:bg-surface-hover split:rounded-xs split:bg-transparent split:px-3 split:py-2.5 split:text-sm split:whitespace-normal",
              )}
            >
              {section.title}
            </SafeLink>
          ))}
        </nav>

        <div className="tablet:gap-8 flex flex-col gap-6.5">
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
                    "tablet:leading-[1.75] text-body leading-[1.65]",
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
