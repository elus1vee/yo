import { type Copy, ResponsiveText } from "@/components/ui/responsive-text";
import { Section } from "./section";

export interface PageIntroProps {
  title: string;
  /** May be shorter on mobile: { desktop, mobile }. */
  description?: Copy;
}

/** Page heading (h1) with a short lead, used at the top of inner pages. */
export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <Section
      className="tablet:px-10 tablet:pb-6 px-[18px] pt-2 pb-4"
      containerClassName="gap-2.5 tablet:gap-3.5"
    >
      <h1 className="font-heading text-h1">{title}</h1>
      {description && (
        <ResponsiveText
          as="p"
          text={description}
          className="text-text-muted tablet:text-base max-w-[560px] text-[15px] leading-[1.6]"
        />
      )}
    </Section>
  );
}
