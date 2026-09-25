import Image from "next/image";
import { ArrowIcon } from "@/components/ui/icons";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { SafeLink } from "@/components/ui/safe-link";
import { cn } from "@/lib/utils";
import { type CardImage, type CardTint, cardTintClass } from "./types";

export interface AnimalCardProps {
  name: string;
  /** Catalog filtered by this animal. */
  href: string;
  tint: CardTint;
  image?: CardImage;
  /** Caption of the placeholder shown until a photo exists (desktop only). */
  imageCaption?: string;
}

/** "Кому выбираем?" card: tall on desktop, compact row on mobile. */
export function AnimalCard({
  name,
  href,
  tint,
  image,
  imageCaption,
}: AnimalCardProps) {
  return (
    <SafeLink
      href={href}
      className={cn(
        "text-text hover:shadow-hover rounded-panel-sm focus-ring flex items-center gap-4 p-4 transition-[transform,box-shadow] duration-150 hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        "tablet:flex-col tablet:items-stretch tablet:gap-5 tablet:rounded-lg tablet:p-6.5",
        cardTintClass[tint],
      )}
    >
      <div className="tablet:h-[200px] tablet:w-auto tablet:rounded-md rounded-photo relative h-20 w-24 shrink-0 overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 420px, 96px"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder
            tint={tint}
            caption={imageCaption}
            captionClassName="hidden tablet:block"
          />
        )}
      </div>
      <div className="flex flex-1 items-center justify-between gap-3">
        <span className="font-heading tablet:text-[30px] text-[24px]">
          {name}
        </span>
        <span
          aria-hidden="true"
          className="bg-surface text-primary tablet:size-10 flex size-11 shrink-0 items-center justify-center rounded-full"
        >
          <ArrowIcon size={18} />
        </span>
      </div>
    </SafeLink>
  );
}
