import type { GlobalConfig } from "payload";
import { revalidateHome } from "./hooks/revalidate";

/**
 * Decorative photos on the home page that aren't tied to a product/article
 * (hero panel, "Кому выбираем?" cards) — everything else on the page (copy,
 * headings, CTAs) still lives in src/content/home.ts.
 */
export const Home: GlobalConfig = {
  slug: "home",
  label: "Главная — фото",
  access: { read: () => true },
  hooks: { afterChange: [revalidateHome] },
  fields: [
    {
      name: "heroImage",
      label: "Фото в шапке главной",
      type: "upload",
      relationTo: "media",
      admin: { description: "Без фото остаётся текущее фото по умолчанию" },
    },
    {
      name: "animalImages",
      label: "Фото в карточках «Кому выбираем?»",
      type: "group",
      fields: [
        { name: "cats", label: "Кошки", type: "upload", relationTo: "media" },
        { name: "dogs", label: "Собаки", type: "upload", relationTo: "media" },
        {
          name: "rodents",
          label: "Грызуны",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
};
