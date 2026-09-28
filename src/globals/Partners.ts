import type { GlobalConfig } from "payload";
import { revalidateAboutPage } from "./hooks/revalidate";

export const Partners: GlobalConfig = {
  slug: "partners",
  label: "Партнёры",
  access: { read: () => true },
  hooks: { afterChange: [revalidateAboutPage] },
  fields: [
    {
      name: "partners",
      label: "Партнёры",
      type: "array",
      fields: [
        { name: "name", label: "Название", type: "text", required: true },
        {
          name: "logo",
          label: "Логотип",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Без логотипа плитка показывает первые буквы названия",
          },
        },
        {
          name: "tint",
          label: "Цвет плитки (пока нет логотипа)",
          type: "select",
          required: true,
          defaultValue: "primary",
          options: [
            { label: "Персик", value: "peach" },
            { label: "Лаванда", value: "lavender" },
            { label: "Зелёный (основной)", value: "primary" },
            { label: "Нейтральный", value: "neutral" },
          ],
        },
        { name: "url", label: "Ссылка", type: "text" },
      ],
    },
  ],
};
