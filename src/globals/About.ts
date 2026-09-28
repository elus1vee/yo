import type { GlobalConfig } from "payload";
import { revalidateAboutPage } from "./hooks/revalidate";

const tintOptions = [
  { label: "Персик", value: "peach" },
  { label: "Лаванда", value: "lavender" },
  { label: "Зелёный (основной)", value: "primary" },
  { label: "Нейтральный", value: "neutral" },
];

/** Content of the "О компании" page: intro, production and certificate tiles. */
export const About: GlobalConfig = {
  slug: "about",
  label: "О компании",
  access: { read: () => true },
  hooks: { afterChange: [revalidateAboutPage] },
  fields: [
    {
      name: "intro",
      label: "Вступление",
      type: "group",
      fields: [
        { name: "eyebrow", label: "Надпись над заголовком", type: "text" },
        { name: "title", label: "Заголовок", type: "text", required: true },
        {
          name: "description",
          label: "Описание",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      name: "production",
      label: "Производство и команда",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Заголовок блока",
          type: "text",
          required: true,
        },
        {
          name: "items",
          label: "Карточки",
          type: "array",
          minRows: 1,
          fields: [
            {
              name: "tint",
              label: "Цвет",
              type: "select",
              required: true,
              options: tintOptions,
            },
            { name: "text", label: "Текст", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      name: "certificates",
      label: "Сертификаты и стандарты",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Заголовок блока",
          type: "text",
          required: true,
        },
        {
          name: "items",
          label: "Карточки",
          type: "array",
          minRows: 1,
          fields: [
            { name: "title", label: "Название", type: "text", required: true },
            {
              name: "description",
              label: "Описание",
              type: "text",
              required: true,
            },
            {
              name: "tint",
              label: "Цвет",
              type: "select",
              required: true,
              options: tintOptions,
            },
          ],
        },
      ],
    },
    {
      name: "whereToBuy",
      label: "«Где купить»",
      type: "group",
      admin: { description: "Сами плитки партнёров — в глобале «Партнёры»" },
      fields: [
        {
          name: "title",
          label: "Заголовок блока",
          type: "text",
          required: true,
        },
        { name: "aside", label: "Пояснение", type: "text", required: true },
      ],
    },
  ],
};
