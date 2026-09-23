import { type ButtonSize, type ButtonVariant, buttonClassName } from "./button";
import { SafeLink, type SafeLinkProps } from "./safe-link";

export interface ButtonLinkProps extends SafeLinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** A link (navigation) styled like <Button>. */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <SafeLink
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}
