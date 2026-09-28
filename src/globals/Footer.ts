import type { GlobalConfig } from "payload";
import { revalidateSiteLayout } from "./hooks/revalidate";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Подвал",
  access: { read: () => true },
  hooks: { afterChange: [revalidateSiteLayout] },
  fields: [
    {
      name: "requisites",
      label: "Реквизиты",
      type: "array",
      fields: [{ name: "line", label: "Строка", type: "text", required: true }],
    },
    {
      name: "socials",
      label: "Соцсети",
      type: "array",
      fields: [
        { name: "label", label: "Название", type: "text", required: true },
        { name: "href", label: "Ссылка", type: "text", required: true },
      ],
    },
  ],
};
