import type { GlobalConfig } from "payload";
import { revalidateSiteLayout } from "./hooks/revalidate";

export const Header: GlobalConfig = {
  slug: "header",
  label: "Шапка",
  access: { read: () => true },
  hooks: { afterChange: [revalidateSiteLayout] },
  fields: [
    {
      name: "menuItems",
      label: "Пункты меню",
      type: "array",
      fields: [
        { name: "label", label: "Название", type: "text", required: true },
        {
          name: "href",
          label: "Ссылка",
          type: "text",
          required: true,
          admin: { description: "Например /catalog или https://…" },
        },
      ],
    },
    {
      name: "messengers",
      label: "Мессенджеры",
      type: "array",
      fields: [
        {
          name: "kind",
          label: "Мессенджер",
          type: "select",
          required: true,
          options: [
            { label: "Telegram", value: "telegram" },
            { label: "WhatsApp", value: "whatsapp" },
            { label: "Viber", value: "viber" },
          ],
        },
        { name: "href", label: "Ссылка", type: "text", required: true },
      ],
    },
  ],
};
