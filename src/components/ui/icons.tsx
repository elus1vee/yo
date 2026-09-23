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
