import Image from "next/image";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";
import { type CardImage, type CardTint, cardTintClass } from "./types";

export interface ProductTag {
  label: string;
  tone?: BadgeTone;
  /** Saturated version — marks the selected volume / scent. */
  strong?: boolean;
}

/**
 * `feature` is the home-page card (bigger photo, corner badge, meta line);
 * `catalog` is the denser listing card (type label above the title, one tag).
 */
const variantStyles = {
  feature: {
    card: "rounded-panel p-3 tablet:gap-4 tablet:rounded-lg tablet:p-4",
    media: "w-[130px] rounded-tile tablet:h-[250px] tablet:rounded-md",
    body: "gap-2 tablet:gap-3",
    title: "text-h3",
    tag: "px-2.75 py-1.5 text-[11px] tablet:px-3.25 tablet:py-1.75 tablet:text-xs",
    cta: "text-[13px] tablet:h-[50px] tablet:text-[14px]",
  },
  catalog: {
    card: "rounded-card-sm p-3 tablet:gap-3.5 tablet:rounded-md tablet:p-4",
    media: "w-[120px] rounded-photo-sm tablet:h-[210px] tablet:rounded-photo",
    body: "gap-2 tablet:gap-2.5",
    title:
      "text-base leading-[1.24] font-medium tablet:min-h-12 tablet:text-[19px]",
    tag: "px-2.75 py-1.25 text-[11px] text-text tablet:px-3 tablet:py-1.5 tablet:text-xs",
    cta: "h-[42px] text-[13px] tablet:h-12 tablet:text-[14px]",
  },
} as const;

export interface ProductCardProps {
  name: string;
  /** Product page. The whole card is clickable through the CTA link. */
  href: string;
  variant?: keyof typeof variantStyles;
  /** Small caps line above the title, e.g. the product type ("Наполнители"). */
  eyebrow?: string;
  /** e.g. "6 л / 2,5 кг". */
  volume?: string;
  /** Product type, shown after the volume from `tablet` up, e.g. "комкующийся". */
  kind?: string;
  /** Photo background; pick the product line's color. */
  tint?: CardTint;
  image?: CardImage;
  /** Caption of the striped placeholder shown until a photo exists (desktop only). */
  imageCaption?: string;
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
  variant = "feature",
  eyebrow,
  volume,
  kind,
  tint = "neutral",
  image,
  imageCaption,
  badge,
  tags = [],
  ctaLabel,
  className,
}: ProductCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card
      as="article"
      interactive
      className={cn(
        "tablet:flex-col relative flex gap-3.5",
        styles.card,
        className,
      )}
    >
      <div
        className={cn(
          "tablet:min-h-0 tablet:w-auto tablet:self-auto relative min-h-[140px] shrink-0 self-stretch overflow-hidden",
          styles.media,
          cardTintClass[tint],
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 310px, 130px"
            className="object-cover mix-blend-multiply"
          />
        ) : (
          <ImagePlaceholder
            variant="tint"
            tint={tint}
            caption={imageCaption}
            captionClassName="hidden tablet:block"
          />
        )}
        {badge && (
          <Badge className="bg-surface text-text tablet:inline-flex absolute top-3.5 left-3.5 hidden px-3.5 text-[11px] font-extrabold tracking-[0.04em]">
            {badge}
          </Badge>
        )}
      </div>

      <div
        className={cn(
          "tablet:px-1.5 tablet:pt-0 tablet:pb-1.5 flex min-w-0 flex-1 flex-col py-1.5 pr-1.5",
          styles.body,
        )}
      >
        {eyebrow && (
          <p className="text-text-muted tablet:text-[10px] tablet:tracking-[0.14em] text-[9px] tracking-[0.12em] [overflow-wrap:anywhere] uppercase">
            {eyebrow}
          </p>
        )}
        <h3
          className={cn("font-heading [overflow-wrap:anywhere]", styles.title)}
        >
          {name}
        </h3>
        {volume && (
          <p className="text-text-muted tablet:text-sm text-xs [overflow-wrap:anywhere]">
            {volume}
            {kind && <span className="tablet:inline hidden"> · {kind}</span>}
          </p>
        )}
        {tags.length > 0 && (
          <ul className="tablet:gap-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li key={tag.label}>
                <Badge
                  tone={tag.tone}
                  strong={tag.strong}
                  className={styles.tag}
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
          className={cn(
            "mt-auto w-full after:absolute after:inset-0",
            styles.cta,
          )}
        >
          {ctaLabel}
        </ButtonLink>
      </div>
    </Card>
  );
}
