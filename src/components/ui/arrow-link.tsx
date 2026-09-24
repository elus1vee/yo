import { cn } from "@/lib/utils";
import { ArrowIcon } from "./icons";
import { SafeLink, type SafeLinkProps } from "./safe-link";

/** "Ссылка со стрелкой": text + separate arrow icon, primary → text on hover. */
export function ArrowLink({ className, children, ...props }: SafeLinkProps) {
  return (
    <SafeLink
      className={cn(
        "text-primary hover:text-text focus-visible:outline-primary inline-flex items-center gap-[7px] rounded-sm text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowIcon size={15} />
    </SafeLink>
  );
}
