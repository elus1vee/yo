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
      inset="page"
      className={cn("tablet:pb-6 pt-2 pb-4", media && "tablet:pb-10 pb-6")}
      containerClassName={cn(
        "gap-3.5 tablet:gap-3.5",
        media &&
          "split:grid split:grid-cols-2 split:items-center split:gap-x-14",
      )}
    >
      <div className="tablet:gap-3.5 flex flex-col gap-2.5">
        {eyebrow && (
          <p className="text-text-muted text-label uppercase">{eyebrow}</p>
        )}
        <h1 className="font-heading text-h1">{title}</h1>
        {description && (
          <ResponsiveText
            as="p"
            text={description}
            className="text-text-muted text-body max-w-[560px]"
          />
        )}
      </div>
      {media && (
        <div className="tablet:h-[340px] tablet:rounded-lg relative h-[220px] overflow-hidden rounded-md">
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
