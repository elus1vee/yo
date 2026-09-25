import { type ComponentProps } from "react";

/**
 * Stroke arrow used by "ссылка со стрелкой". Always its own SVG (never a
 * "→" character) so it centers on the text — see the handoff README.
 */
export function ArrowIcon({
  size = 16,
  ...props
}: { size?: number } & ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="block shrink-0"
      {...props}
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/** Base for the 24px stroke icons used in info tiles (2px stroke). */
function OutlineIcon({
  size = 20,
  children,
  ...props
}: { size?: number } & ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="block shrink-0"
      {...props}
    >
      {children}
    </svg>
  );
}

type OutlineIconProps = { size?: number } & ComponentProps<"svg">;

export function ShieldCheckIcon(props: OutlineIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </OutlineIcon>
  );
}

export function PinIcon(props: OutlineIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </OutlineIcon>
  );
}

export function PhoneIcon(props: OutlineIconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </OutlineIcon>
  );
}

export function MailIcon(props: OutlineIconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6 8 7 8-7" />
    </OutlineIcon>
  );
}
