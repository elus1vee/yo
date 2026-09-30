import type { GlobalConfig } from "payload";
import { revalidateSiteLayout } from "./hooks/revalidate";

export const Header: GlobalConfig = {
  slug: "header",
  label: "Шапка",
  access: { read: () => true },
  hooks: { afterChange: [revalidateSiteLayout] },
  fields: [
    {
      name: "logo",
      label: "Логотип «Йо!» (шапка)",
      type: "upload",
      relationTo: "media",
      admin: { description: "Без файла используется логотип по умолчанию" },
    },
    {
      name: "clarityBadge",
      label: "Бейдж Clarity",
      type: "upload",
      relationTo: "media",
      admin: { description: "Показывается в шапке и в подвале сайта" },
    },
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
