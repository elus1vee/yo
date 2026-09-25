import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { type Copy, ResponsiveText } from "@/components/ui/responsive-text";
import { cn } from "@/lib/utils";
import { type CardImage, type CardTint, cardTintClass } from "./types";

export interface PhotoCardProps {
  /** May be shorter on mobile: { desktop, mobile }. */
  text: Copy;
  tint: CardTint;
  /** Without an image the striped placeholder is shown. */
  image?: CardImage;
}

/** Photo with a short caption underneath ("Производство и команда"). */
export function PhotoCard({ text, tint, image }: PhotoCardProps) {
  return (
    <Card className="tablet:gap-4 tablet:rounded-md tablet:p-6 flex flex-col gap-3 rounded-[22px] p-[18px]">
      <div
        className={cn(
          "tablet:h-[180px] tablet:rounded-[18px] relative h-[150px] overflow-hidden rounded-2xl",
          cardTintClass[tint],
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1440px) 420px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder variant="tint" tint={tint} />
        )}
      </div>
      <ResponsiveText
        as="p"
        text={text}
        className="text-text-muted text-sm leading-[1.55]"
      />
    </Card>
  );
}
