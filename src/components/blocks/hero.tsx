import Image from "next/image";
import { type ButtonVariant } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { type Copy, ResponsiveText } from "@/components/ui/responsive-text";
import { Section } from "./section";
import { TitleParts } from "./title-parts";
import { type CardImage, type LinkAction, type TitlePart } from "./types";

export interface HeroFact {
  value: string;
  label: string;
}

export interface HeroProps {
  /** Pill above the title; the mockup drops the "· с 2014 года" part on mobile. */
  eyebrow: Copy;
  title: TitlePart[];
  description: Copy;
  /** Primary and secondary CTA, in order. */
  actions: (LinkAction & { variant: ButtonVariant })[];
  /** Without a photo the striped placeholder is shown. */
  media?: CardImage;
  mediaCaption?: string;
  /** Small stat cards under the photo (desktop only). */
  facts?: HeroFact[];
}

/**
 * Peach hero panel. Two columns from `lg`; below that everything stacks and
 * (as on the mobile mockup) the photo sits between the text and the buttons.
 */
export function Hero({
  eyebrow,
  title,
  description,
  actions,
  media,
  mediaCaption,
  facts = [],
}: HeroProps) {
  return (
    <Section className="tablet:pt-2 tablet:pb-16 pt-1.5">
      <div className="bg-peach-tint tablet:rounded-xl tablet:px-14 tablet:py-16 split:grid split:grid-cols-2 split:items-center split:gap-x-12 relative flex flex-col gap-5 overflow-hidden rounded-lg px-5.5 py-7">
        {/* `contents` on mobile so the photo can slot between text and actions */}
        <div className="split:flex split:flex-col split:items-start split:gap-6.5 contents">
          <ResponsiveText
            text={eyebrow}
            className="bg-surface tablet:px-4.5 tablet:py-2.25 tablet:text-[13px] self-start rounded-full px-4 py-2 text-xs font-bold"
          />
          <h1 className="font-heading text-display text-pretty">
            <TitleParts parts={title} accentClassName="italic text-primary" />
          </h1>
          <ResponsiveText
            as="p"
            text={description}
            className="text-text-muted tablet:text-lg max-w-[430px] text-base leading-[1.6]"
          />
          <div className="split:order-none split:flex-row split:items-center split:gap-3.5 order-2 flex flex-col gap-2.5">
            {actions.map((action) => (
              <ButtonLink
                key={action.href + action.label}
                href={action.href}
                variant={action.variant}
                size="lg"
                className="tablet:h-[58px] split:w-auto h-[54px] w-full"
              >
                {action.label}
              </ButtonLink>
            ))}
          </div>
        </div>

        <div className="split:order-none order-1 flex flex-col gap-4">
          <div className="tablet:h-[380px] tablet:rounded-lg relative h-[280px] overflow-hidden rounded-md">
            {media ? (
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            ) : (
              <ImagePlaceholder caption={mediaCaption} align="bottom" />
            )}
          </div>
          {facts.length > 0 && (
            <ul className="tablet:flex hidden gap-3">
              {facts.map((fact) => (
                <li key={fact.value} className="flex-1">
                  <Card className="rounded-card-sm flex h-full flex-col gap-1 px-5 py-4.5">
                    <span className="font-heading text-[26px]">
                      {fact.value}
                    </span>
                    <span className="text-text-muted text-[13px]">
                      {fact.label}
                    </span>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
