import type { TextField } from "payload";

/**
 * URL slug. Latin only on purpose: pages look documents up by slug, and a
 * strict pattern keeps odd characters out of URLs.
 */
export const slugField = (): TextField => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "Латиницей: буквы, цифры и дефисы, например tofu-peach",
  },
  validate: (value: string | null | undefined) =>
    typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
      ? true
      : "Только строчные латинские буквы, цифры и дефисы",
});
