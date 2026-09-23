import { type MessengerKind } from "./types";

/**
 * Glyphs copied from the handoff mockup. The README asks to swap them for
 * the official Telegram / WhatsApp / Viber glyphs before launch.
 */
const paths: Record<MessengerKind, string> = {
  telegram:
    "M22 3.2 1.9 11.3c-.6.2-.6 1.1 0 1.3l5 1.6 1.9 5.7c.2.5.8.6 1.2.2l2.6-2.7 4.9 3.6c.5.3 1.1.1 1.3-.5L22.9 4c.1-.6-.4-1-.9-.8Z",
  whatsapp:
    "M12 3C6.9 3 3 6.6 3 11.1c0 2.3 1.1 4.4 2.9 5.8L5 21.2l4.6-2.2c.8.2 1.6.3 2.4.3 5.1 0 9-3.6 9-8.2S17.1 3 12 3Z",
  viber:
    "M8.4 3.6 10.3 7c.2.5.1 1-.3 1.3L8.5 9.5c.9 2.1 2.6 3.8 4.7 4.7l1.2-1.5c.3-.4.9-.5 1.3-.3l3.4 1.9c.5.3.7.9.5 1.4l-.9 2c-.3.6-.9.9-1.5.8-6.1-.9-10.9-5.7-11.8-11.8-.1-.6.2-1.2.8-1.5l2-.9c.5-.2 1.1 0 1.4.5Z",
};

export function MessengerIcon({ kind }: { kind: MessengerKind }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={paths[kind]} />
    </svg>
  );
}
