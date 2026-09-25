import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowIcon } from "@/components/ui/icons";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { SafeLink } from "@/components/ui/safe-link";
import { cn } from "@/lib/utils";
import { type CardImage, type CardTint, cardTintClass } from "./types";

/**
 * - feature: home page — vertical from `tablet`, compact row below (no teaser)
 * - list:    news list — vertical everywhere, teaser and "Читать" always shown
 * - compact: "similar news" — vertical from `tablet`, 110px row below
 */
const variantStyles = {
  feature: {
    card: "items-center rounded-[28px] tablet:items-stretch tablet:rounded-lg",
    media: "size-[100px] rounded-[20px] tablet:h-[190px] tablet:rounded-md",
    body: "gap-2 pr-2 tablet:gap-2.5 tablet:px-2 tablet:pb-2.5",
    title: "text-h3",
    excerpt: "hidden tablet:block",
    readMore: "hidden tablet:flex",
  },
  list: {
    card: "flex-col gap-3 rounded-[22px] tablet:gap-3.5 tablet:rounded-md",
    media: "h-[170px] rounded-2xl tablet:h-[220px] tablet:rounded-[18px]",
    body: "gap-2 px-1 pb-1 tablet:gap-2.5 tablet:px-1.5 tablet:pb-1.5",
    title: "text-h3",
    excerpt: "text-[13px] tablet:text-sm",
    readMore: "flex",
  },
  compact: {
    card: "rounded-[22px] tablet:items-stretch tablet:rounded-md",
    media: "size-[110px] rounded-2xl tablet:h-[190px] tablet:rounded-[18px]",
    body: "gap-2 py-1 pr-1 tablet:gap-2.5 tablet:px-1.5 tablet:pb-1.5",
    title: "text-base font-medium leading-[1.25] tablet:text-[19px]",
    excerpt: "hidden",
    readMore: "flex",
  },
} as const;

export interface NewsCardProps {
  title: string;
  /** Article page. The title is the link; the whole card is its click target. */
  href: string;
  variant?: keyof typeof variantStyles;
  /** Human-readable date, already localized, e.g. "12 сентября 2026". */
  date: string;
  /** Machine-readable date for <time>, e.g. "2026-09-12". */
  dateTime?: string;
  category?: string;
  /** Short teaser (see `variant` for where it shows). */
  excerpt?: string;
  tint?: CardTint;
  /** Without an image the striped placeholder is shown. */
  image?: CardImage;
  /** Label of the "Читать →" affordance (decorative; the title is the link). */
  readMoreLabel: string;
  className?: string;
}

/** News card, in three densities — see `variant`. */
export function NewsCard({
  title,
  href,
  variant = "feature",
  date,
  dateTime,
  category,
  excerpt,
  tint = "neutral",
  image,
  readMoreLabel,
  className,
}: NewsCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card
      interactive
      className={cn(
        "has-focus-visible:shadow-focus-button tablet:flex-col tablet:gap-4 tablet:p-4 relative flex gap-3.5 p-3",
        styles.card,
        className,
      )}
    >
      <div
        className={cn(
          "tablet:w-auto relative shrink-0 overflow-hidden",
          styles.media,
          cardTintClass[tint],
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 440px, 110px"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder variant="tint" tint={tint} />
        )}
      </div>

      <div className={cn("flex min-w-0 flex-1 flex-col", styles.body)}>
        <p className="text-text-muted tablet:text-[13px] text-xs [overflow-wrap:anywhere]">
          <time dateTime={dateTime}>{date}</time>
          {category && <span> · {category}</span>}
        </p>
        <h3
          className={cn("font-heading [overflow-wrap:anywhere]", styles.title)}
        >
          <SafeLink
            href={href}
            className="outline-none after:absolute after:inset-0"
          >
            {title}
          </SafeLink>
        </h3>
        {excerpt && (
          <p
            className={cn(
              "text-text-muted leading-[1.55] [overflow-wrap:anywhere]",
              styles.excerpt,
            )}
          >
            {excerpt}
          </p>
        )}
        <span
          aria-hidden="true"
          className={cn(
            "text-primary tablet:gap-[7px] tablet:text-sm mt-auto items-center gap-1.5 text-[13px] font-bold",
            styles.readMore,
          )}
        >
          {readMoreLabel}
          <ArrowIcon size={15} />
        </span>
      </div>
    </Card>
  );
}
