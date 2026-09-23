import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowIcon } from "@/components/ui/icons";
import { SafeLink } from "@/components/ui/safe-link";
import { cn } from "@/lib/utils";
import { type CardImage, type CardTint, cardTintClass } from "./types";

export interface NewsCardProps {
  title: string;
  /** Article page. The title is the link; the whole card is its click target. */
  href: string;
  /** Human-readable date, already localized, e.g. "12 сентября 2026". */
  date: string;
  /** Machine-readable date for <time>, e.g. "2026-09-12". */
  dateTime?: string;
  category?: string;
  /** Short teaser, shown from `tablet` up. */
  excerpt?: string;
  tint?: CardTint;
  /** Without an image the tinted box is shown as a placeholder. */
  image?: CardImage;
  /** Label of the "Читать →" affordance (decorative; the title is the link). */
  readMoreLabel: string;
  className?: string;
}

/** Vertical card from `tablet` up, compact horizontal card below it. */
export function NewsCard({
  title,
  href,
  date,
  dateTime,
  category,
  excerpt,
  tint = "neutral",
  image,
  readMoreLabel,
  className,
}: NewsCardProps) {
  return (
    <Card
      interactive
      className={cn(
        "has-focus-visible:shadow-focus-button tablet:flex-col tablet:items-stretch tablet:gap-4 tablet:rounded-lg tablet:p-4 relative flex items-center gap-3.5 rounded-[28px] p-3",
        className,
      )}
    >
      <div
        className={cn(
          "tablet:h-[190px] tablet:w-auto tablet:rounded-md relative size-[100px] shrink-0 overflow-hidden rounded-[20px]",
          cardTintClass[tint],
        )}
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 440px, 100px"
            className="object-cover"
          />
        )}
      </div>

      <div className="tablet:gap-2.5 tablet:px-2 tablet:pb-2.5 flex min-w-0 flex-1 flex-col gap-2 pr-2">
        <p className="text-text-muted tablet:text-[13px] text-xs [overflow-wrap:anywhere]">
          <time dateTime={dateTime}>{date}</time>
          {category && <span> · {category}</span>}
        </p>
        <h3 className="font-heading text-h3 [overflow-wrap:anywhere]">
          <SafeLink
            href={href}
            className="outline-none after:absolute after:inset-0"
          >
            {title}
          </SafeLink>
        </h3>
        {excerpt && (
          <p className="text-text-muted tablet:block hidden text-sm [overflow-wrap:anywhere]">
            {excerpt}
          </p>
        )}
        <span
          aria-hidden="true"
          className="text-primary tablet:flex mt-auto hidden items-center gap-[7px] text-sm font-bold"
        >
          {readMoreLabel}
          <ArrowIcon size={15} />
        </span>
      </div>
    </Card>
  );
}
