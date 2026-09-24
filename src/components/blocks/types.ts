/** Shared prop types for the blocks. Data is passed in, never hardcoded. */

export interface ImageAsset {
  src: string;
  alt: string;
  /** Intrinsic size, used by next/image to reserve space. */
  width: number;
  height: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export type MessengerKind = "telegram" | "whatsapp" | "viber";

export interface Messenger {
  kind: MessengerKind;
  href: string;
  /** Accessible name, e.g. "Написать в Telegram". */
  label: string;
}

/** Photo for a card; `fill` layout, so no intrinsic size needed. */
export interface CardImage {
  src: string;
  alt: string;
}

/** Background tint behind a product/news photo, from the product-line colors. */
export type CardTint = "peach" | "lavender" | "primary" | "neutral";

export const cardTintClass: Record<CardTint, string> = {
  peach: "bg-peach-tint",
  lavender: "bg-lavender-tint",
  primary: "bg-primary-tint",
  neutral: "bg-surface-tint",
};

/** A heading split into parts so one word can be accented (italic). */
export interface TitlePart {
  text: string;
  accent?: boolean;
  /** Line break after this part from `tablet` up (the mockup's <br>). */
  breakAfter?: boolean;
}

export interface LinkAction {
  label: string;
  href: string;
}
