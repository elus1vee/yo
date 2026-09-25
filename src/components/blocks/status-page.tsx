import { ButtonLink } from "@/components/ui/button-link";
import { type Copy, ResponsiveText } from "@/components/ui/responsive-text";
import { type LinkAction } from "./types";

export interface StatusPageProps {
  /** Big pale number, e.g. "404". */
  code: string;
  title: string;
  /** May be shorter on mobile: { desktop, mobile }. */
  description: Copy;
  action: LinkAction;
}

/** Centered full-height message page (404). Renders its own <main>. */
export function StatusPage({
  code,
  title,
  description,
  action,
}: StatusPageProps) {
  return (
    <main className="tablet:gap-6 flex flex-1 flex-col items-center justify-center gap-[18px] px-6 py-10 text-center">
      <p className="font-heading text-primary-tint tablet:text-[120px] text-[76px] leading-none font-medium">
        {code}
      </p>
      <h1 className="font-heading text-h2">{title}</h1>
      <ResponsiveText
        as="p"
        text={description}
        className="text-text-muted tablet:text-base max-w-[440px] text-[15px] leading-[1.6]"
      />
      <ButtonLink
        href={action.href}
        variant="primary"
        className="tablet:h-14 tablet:px-8 tablet:text-base h-[52px] px-7 text-[15px]"
      >
        {action.label}
      </ButtonLink>
    </main>
  );
}
