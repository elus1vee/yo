import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { SafeLink } from "@/components/ui/safe-link";
import { cn } from "@/lib/utils";
import { MessengerIcon, messengerToneClass } from "./messenger-icon";
import { Section } from "./section";
import {
  type CardImage,
  type CardTint,
  type Messenger,
  cardTintClass,
} from "./types";

export interface ArticleProduct {
  name: string;
  /** e.g. "6 л / 2,5 кг · наполнители". */
  meta: string;
  href: string;
}

export interface NewsArticleProps {
  title: string;
  /** Human-readable date, e.g. "12 сентября 2026". */
  date: string;
  /** Machine-readable date for <time>. */
  dateTime?: string;
  category?: string;
  /** Cover photo background / placeholder color. */
  tint: CardTint;
  cover?: CardImage;
  /**
   * Plain-text paragraphs. Rendered as text (escaped), never as HTML; the
   * first one is the lead and is set darker than the rest.
   */
  body: string[];
  /** Product the article is about ("О товаре" card). */
  product?: ArticleProduct;
  /** Share buttons; `href` is the share URL for that messenger. */
  share?: Messenger[];
  labels: { aboutProduct: string; toProduct: string; share: string };
}

const asideLabel =
  "text-[11px] font-bold tracking-[0.12em] text-text-muted uppercase";

/**
 * Article page body. Mobile: title, cover, text. From `tablet` the sidebar
 * follows the text; from `lg` the cover spans the top and the sidebar sits
 * (sticky) next to title and text.
 */
export function NewsArticle({
  title,
  date,
  dateTime,
  category,
  tint,
  cover,
  body,
  product,
  share = [],
  labels,
}: NewsArticleProps) {
  const hasAside = Boolean(product) || share.length > 0;

  return (
    <Section className="tablet:px-10 tablet:pt-5 tablet:pb-16 px-[18px] pt-3.5 pb-0">
      <div
        className={cn(
          "tablet:gap-y-6 grid gap-x-16 gap-y-4",
          hasAside && "lg:grid-cols-[minmax(0,1fr)_300px]",
        )}
      >
        <header className="tablet:gap-6 flex flex-col gap-3 lg:col-start-1 lg:row-start-2">
          <p className="text-text-muted tablet:text-[13px] text-xs">
            <time dateTime={dateTime}>{date}</time>
            {category && <span> · {category}</span>}
          </p>
          <h1 className="font-heading text-h1 [overflow-wrap:anywhere]">
            {title}
          </h1>
        </header>

        <div
          className={cn(
            "tablet:h-[480px] tablet:rounded-lg relative h-60 overflow-hidden rounded-[24px] lg:col-span-full lg:row-start-1 lg:mb-5",
            cardTintClass[tint],
          )}
        >
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1440px) 1360px, 100vw"
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder variant="tint" tint={tint} />
          )}
        </div>

        <div className="tablet:mt-0 tablet:gap-5 tablet:text-[17px] tablet:leading-[1.75] mt-1 flex max-w-[640px] flex-col gap-4 text-[15px] leading-[1.65] lg:col-start-1 lg:row-start-3">
          {body.map((paragraph, i) => (
            <p key={i} className={i > 0 ? "text-text-muted" : undefined}>
              {paragraph}
            </p>
          ))}
        </div>

        {hasAside && (
          <aside className="tablet:flex mt-4 hidden flex-col gap-5 lg:sticky lg:top-[110px] lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:mt-0 lg:self-start">
            {product && (
              <Card className="flex flex-col gap-4 rounded-md p-6">
                <p className={asideLabel}>{labels.aboutProduct}</p>
                <div className="flex flex-col gap-1">
                  <span className="font-heading text-[19px]">
                    {product.name}
                  </span>
                  <span className="text-text-muted text-[13px]">
                    {product.meta}
                  </span>
                </div>
                <ButtonLink
                  href={product.href}
                  variant="dark"
                  size="sm"
                  className="h-[46px] w-full"
                >
                  {labels.toProduct}
                </ButtonLink>
              </Card>
            )}
            {share.length > 0 && (
              <Card className="flex flex-col gap-3.5 rounded-md p-6">
                <p className={asideLabel}>{labels.share}</p>
                <ul className="flex gap-2">
                  {share.map((m) => (
                    <li key={m.kind}>
                      <SafeLink
                        href={m.href}
                        aria-label={m.label}
                        className={cn(
                          "text-text focus-visible:shadow-focus-button flex size-10 items-center justify-center rounded-full transition-colors focus-visible:outline-none",
                          messengerToneClass[m.kind],
                        )}
                      >
                        <MessengerIcon kind={m.kind} />
                      </SafeLink>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </aside>
        )}
      </div>
    </Section>
  );
}
