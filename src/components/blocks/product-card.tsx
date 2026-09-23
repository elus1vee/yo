import Image from "next/image";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type CardImage, type CardTint, cardTintClass } from "./types";

export interface ProductTag {
  label: string;
  tone?: BadgeTone;
  /** Saturated version — marks the selected volume / scent. */
  strong?: boolean;
}

export interface ProductCardProps {
  name: string;
  /** Product page. The whole card is clickable through the CTA link. */
  href: string;
  /** e.g. "6 л / 2,5 кг". */
  volume: string;
  /** Product type, shown after the volume from `tablet` up, e.g. "комкующийся". */
  kind?: string;
  /** Photo background; pick the product line's color. */
  tint?: CardTint;
  /** Without an image the tinted box is shown as a placeholder. */
  image?: CardImage;
  /** Corner label such as "Хит" (desktop layout only). */
  badge?: string;
  tags?: ProductTag[];
  ctaLabel: string;
  className?: string;
}

/**
 * Vertical card from `tablet` up, compact horizontal card below it.
 * `next/image` only serves local files unless the host is allowed in
 * next.config.ts (`images.remotePatterns`).
 */
export function ProductCard({
  name,
  href,
  volume,
  kind,
  tint = "neutral",
  image,
  badge,
  tags = [],
  ctaLabel,
  className,
}: ProductCardProps) {
  return (
    <Card
      interactive
      className={cn(
        "tablet:flex-col tablet:gap-4 tablet:rounded-lg tablet:p-4 relative flex gap-3.5 rounded-[28px] p-3",
        className,
      )}
    >
      <div
        className={cn(
          "tablet:h-[250px] tablet:min-h-0 tablet:w-auto tablet:self-auto tablet:rounded-md relative min-h-[140px] w-[130px] shrink-0 self-stretch overflow-hidden rounded-[20px]",
          cardTintClass[tint],
        )}
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 310px, 130px"
            className="object-cover mix-blend-multiply"
          />
        )}
        {badge && (
          <Badge className="bg-surface text-text tablet:inline-flex absolute top-3.5 left-3.5 hidden px-3.5 text-[11px] font-extrabold tracking-[0.04em]">
            {badge}
          </Badge>
        )}
      </div>

      <div className="tablet:gap-3 tablet:px-1.5 tablet:pt-0 tablet:pb-1.5 flex min-w-0 flex-1 flex-col gap-2 py-1.5 pr-1.5">
        <h3 className="font-heading text-h3 [overflow-wrap:anywhere]">
          {name}
        </h3>
        <p className="text-text-muted tablet:text-sm text-xs [overflow-wrap:anywhere]">
          {volume}
          {kind && <span className="tablet:inline hidden"> · {kind}</span>}
        </p>
        {tags.length > 0 && (
          <ul className="tablet:gap-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li key={tag.label}>
                <Badge
                  tone={tag.tone}
                  strong={tag.strong}
                  className="tablet:px-[13px] tablet:py-[7px] tablet:text-xs px-[11px] py-1.5 text-[11px]"
                >
                  {tag.label}
                </Badge>
              </li>
            ))}
          </ul>
        )}
        <ButtonLink
          href={href}
          variant="dark"
          size="sm"
          className="tablet:h-[50px] tablet:text-[14px] mt-auto w-full text-[13px] after:absolute after:inset-0"
        >
          {ctaLabel}
        </ButtonLink>
      </div>
    </Card>
  );
}
