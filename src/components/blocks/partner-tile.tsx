import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type CardImage, type CardTint, cardTintClass } from "./types";

export interface PartnerTileProps {
  name: string;
  /** Letter(s) shown until the partner's real logo is uploaded. */
  initial: string;
  tint: CardTint;
  logo?: CardImage;
}

/** Retailer / marketplace tile: the real logo once uploaded, else initials. */
export function PartnerTile({ name, initial, tint, logo }: PartnerTileProps) {
  return (
    <Card className="tablet:gap-3.5 tablet:rounded-tile tablet:px-5 tablet:py-7 rounded-photo flex flex-col items-center gap-2.5 p-4 text-center">
      {logo ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={56}
          height={56}
          className="tablet:size-14 size-11 object-contain"
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "font-heading tablet:size-14 tablet:rounded-field tablet:text-xl flex size-11 items-center justify-center rounded-xs text-base",
            cardTintClass[tint],
          )}
        >
          {initial}
        </div>
      )}
      <span className="text-small font-bold">{name}</span>
    </Card>
  );
}
