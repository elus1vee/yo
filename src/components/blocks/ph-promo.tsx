import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { type Copy, ResponsiveText } from "@/components/ui/responsive-text";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { TitleParts } from "./title-parts";
import { type LinkAction, type TitlePart } from "./types";

const stepClass = {
  peach: "bg-peach",
  "peach-tint": "bg-peach-tint",
  "primary-tint": "bg-primary-tint",
  "primary-light": "bg-primary-light",
  lavender: "bg-lavender",
  "lavender-deep": "bg-lavender-deep",
} as const;

export interface PhStep {
  value: string;
  tone: keyof typeof stepClass;
}

export interface PhPromoProps {
  /** Pill such as "Скоро". */
  badge: string;
  title: TitlePart[];
  description: Copy;
  action: LinkAction;
  /** pH values along the gradient, e.g. 5,5 … 9,0. */
  steps: PhStep[];
  captions: { start: Copy; middle: Copy; end: Copy };
}

/** Announcement panel for the upcoming pH-indicator litter. */
export function PhPromo({
  badge,
  title,
  description,
  action,
  steps,
  captions,
}: PhPromoProps) {
  return (
    <Section>
      <div className="bg-primary-tint tablet:rounded-xl tablet:p-14 split:grid-cols-2 split:items-center split:gap-14 grid gap-4.5 rounded-lg px-5.5 py-7">
        <div className="tablet:gap-5.5 flex flex-col items-start gap-4.5">
          <Badge className="bg-primary text-surface tablet:px-4.5 tablet:py-2.25 tablet:text-xs px-4 py-2 text-[11px] font-extrabold tracking-[0.1em] uppercase">
            {badge}
          </Badge>
          <h2 className="font-heading text-h1">
            <TitleParts parts={title} />
          </h2>
          <ResponsiveText
            as="p"
            text={description}
            className="text-primary-hover tablet:text-[17px] max-w-[430px] text-[15px] leading-[1.6]"
          />
          <ButtonLink
            href={action.href}
            variant="dark"
            className="tablet:h-14 tablet:w-auto tablet:px-7.5 tablet:text-[16px] h-[52px] w-full text-[15px]"
          >
            {action.label}
          </ButtonLink>
        </div>

        <Card className="tablet:gap-5 tablet:rounded-lg tablet:p-8 flex flex-col gap-3.5 rounded-md p-5">
          <div className="tablet:h-[26px] h-5 rounded-full bg-[image:var(--gradient-ph)]" />
          <ol className="grid grid-cols-6 gap-2">
            {steps.map((step) => (
              <li key={step.value} className="flex flex-col items-center gap-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    "tablet:block hidden size-[26px] rounded-full",
                    stepClass[step.tone],
                  )}
                />
                <span className="tablet:text-[13px] text-xs font-bold">
                  {step.value}
                </span>
              </li>
            ))}
          </ol>
          <div className="border-border-subtle text-text-muted tablet:pt-4 tablet:text-[13px] flex justify-between gap-2 border-t pt-3 text-xs">
            <ResponsiveText text={captions.start} />
            <ResponsiveText
              text={captions.middle}
              className="text-text font-bold"
            />
            <ResponsiveText text={captions.end} />
          </div>
        </Card>
      </div>
    </Section>
  );
}
