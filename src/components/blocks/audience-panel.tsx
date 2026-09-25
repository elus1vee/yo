import { type ButtonVariant } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { type Copy, ResponsiveText } from "@/components/ui/responsive-text";
import { cn } from "@/lib/utils";
import { type CardTint, type LinkAction, cardTintClass } from "./types";

export interface AudiencePanelProps {
  /** Small caps label, e.g. "покупателям". */
  eyebrow: string;
  title: string;
  description?: Copy;
  tint: CardTint;
  /** Pills, e.g. marketplaces and chains. */
  chips?: string[];
  /** Benefit rows (desktop only). */
  features?: string[];
  action: LinkAction & { variant: ButtonVariant };
}

/** One of the two "Два пути" panels: for buyers / for shops. */
export function AudiencePanel({
  eyebrow,
  title,
  description,
  tint,
  chips = [],
  features = [],
  action,
}: AudiencePanelProps) {
  return (
    <div
      className={cn(
        "tablet:gap-6 tablet:rounded-panel-lg tablet:p-11 flex flex-col gap-4 rounded-lg px-5.5 py-6.5",
        cardTintClass[tint],
      )}
    >
      <p className="text-text-muted tablet:text-xs text-[11px] font-bold tracking-[0.14em] uppercase">
        {eyebrow}
      </p>
      <h3 className="font-heading tablet:text-[34px] text-[26px] leading-[1.14] font-medium">
        {title}
      </h3>
      {description && (
        <ResponsiveText
          as="p"
          text={description}
          className="text-text-muted text-body"
        />
      )}
      {chips.length > 0 && (
        <ul className="tablet:gap-2.5 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li
              key={chip}
              className="bg-surface tablet:h-[50px] tablet:px-5.5 text-small flex h-11 items-center rounded-full px-4.5 font-bold"
            >
              {chip}
            </li>
          ))}
        </ul>
      )}
      {features.length > 0 && (
        <ul className="tablet:flex hidden flex-col gap-2.5">
          {features.map((feature) => (
            <li
              key={feature}
              className="bg-surface flex items-center rounded-full px-5 py-4 text-[15px]"
            >
              {feature}
            </li>
          ))}
        </ul>
      )}
      <ButtonLink
        href={action.href}
        variant={action.variant}
        className="tablet:h-[54px] tablet:w-auto tablet:self-start tablet:px-7 mt-auto h-[50px] w-full text-[15px]"
      >
        {action.label}
      </ButtonLink>
    </div>
  );
}
