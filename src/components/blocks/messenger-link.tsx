import { SafeLink } from "@/components/ui/safe-link";
import { cn } from "@/lib/utils";
import { MessengerIcon, messengerToneClass } from "./messenger-icon";
import { type Messenger } from "./types";

export interface MessengerLinkProps {
  messenger: Messenger;
  /** `icon`: round icon-only button; `pill`: icon + visible name. */
  shape?: "icon" | "pill";
  className?: string;
}

/**
 * Link to a messenger in the brand's pastel colors. Used by the header,
 * the contacts page and the article's share card.
 */
export function MessengerLink({
  messenger,
  shape = "icon",
  className,
}: MessengerLinkProps) {
  return (
    <SafeLink
      href={messenger.href}
      aria-label={messenger.label}
      className={cn(
        "text-text focus-ring flex items-center rounded-full transition-colors",
        messengerToneClass[messenger.kind],
        shape === "icon"
          ? "size-10 justify-center"
          : "h-11 gap-2 px-4 text-[13px] font-bold",
        className,
      )}
    >
      <MessengerIcon kind={messenger.kind} />
      {shape === "pill" && (messenger.text ?? messenger.label)}
    </SafeLink>
  );
}
