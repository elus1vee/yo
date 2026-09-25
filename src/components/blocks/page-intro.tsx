import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { type Copy, ResponsiveText } from "@/components/ui/responsive-text";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { type CardImage } from "./types";

export interface PageIntroProps {
  /** Small caps label above the title, e.g. "Новости". */
  eyebrow?: string;
  title: string;
  /** May be shorter on mobile: { desktop, mobile }. */
  description?: Copy;
  /**
   * Photo beside the text from `lg` (below it on smaller screens). Without
   * `image` the striped placeholder is shown with `caption`.
   */
  media?: { image?: CardImage; caption?: string };
}

/** Page heading (h1) with a short lead, used at the top of inner pages. */
export function PageIntro({
  eyebrow,
  title,
  description,
  media,
}: PageIntroProps) {
  return (
    <Section
      className={cn(
        "tablet:px-10 tablet:pb-6 px-[18px] pt-2 pb-4",
        media && "tablet:pb-10 pb-6",
      )}
      containerClassName={cn(
        "gap-3.5",
        media && "lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-14",
      )}
    >
      <div className="tablet:gap-3.5 flex flex-col gap-2.5">
        {eyebrow && (
          <p className="text-text-muted tablet:text-[13px] text-[11px] font-bold tracking-[0.1em] uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-h1">{title}</h1>
        {description && (
          <ResponsiveText
            as="p"
            text={description}
            className="text-text-muted tablet:text-base max-w-[560px] text-[15px] leading-[1.6]"
          />
        )}
      </div>
      {media && (
        <div className="tablet:h-[340px] tablet:rounded-lg relative h-[220px] overflow-hidden rounded-[24px]">
          {media.image ? (
            <Image
              src={media.image.src}
              alt={media.image.alt}
              fill
              sizes="(min-width: 1024px) 660px, 100vw"
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder
              variant="tint"
              tint="primary"
              caption={media.caption}
              align="bottom"
            />
          )}
        </div>
      )}
    </Section>
  );
}
