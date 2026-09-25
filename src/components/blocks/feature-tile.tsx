import { Card } from "@/components/ui/card";
import { ShieldCheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { type CardTint, cardTintClass } from "./types";

export interface FeatureTileProps {
  title: string;
  description: string;
  /** Color of the icon circle. */
  tint: CardTint;
}

/** Certificate / standard tile: shield icon, name, one-line explanation. */
export function FeatureTile({ title, description, tint }: FeatureTileProps) {
  return (
    <Card className="tablet:gap-3.5 tablet:rounded-md tablet:p-6 flex flex-col items-start gap-2.5 rounded-[20px] p-[18px]">
      <div
        className={cn(
          "text-text tablet:size-[52px] flex size-11 items-center justify-center rounded-full",
          cardTintClass[tint],
        )}
      >
        <ShieldCheckIcon size={22} />
      </div>
      <h3 className="font-heading tablet:text-lg text-[15px]">{title}</h3>
      <p className="text-text-muted tablet:text-[13px] tablet:leading-[1.5] text-xs leading-normal">
        {description}
      </p>
    </Card>
  );
}
