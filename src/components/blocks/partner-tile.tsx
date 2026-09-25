import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type CardTint, cardTintClass } from "./types";

export interface PartnerTileProps {
  name: string;
  /** Letter(s) shown until the partner's real logo is provided. */
  initial: string;
  tint: CardTint;
}

/** Retailer / marketplace tile. TODO: replace the initial with the official logo. */
export function PartnerTile({ name, initial, tint }: PartnerTileProps) {
  return (
    <Card className="tablet:gap-3.5 tablet:rounded-[20px] tablet:px-5 tablet:py-7 flex flex-col items-center gap-2.5 rounded-[18px] p-4 text-center">
      <div
        aria-hidden="true"
        className={cn(
          "font-heading tablet:size-14 tablet:rounded-[14px] tablet:text-xl flex size-11 items-center justify-center rounded-xl text-base",
          cardTintClass[tint],
        )}
      >
        {initial}
      </div>
      <span className="tablet:text-sm text-[13px] font-bold">{name}</span>
    </Card>
  );
}
