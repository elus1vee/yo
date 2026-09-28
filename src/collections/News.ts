import type { CollectionConfig } from "payload";
import { publishedOrEditor } from "./access";
import { slugField } from "./fields";

const tintOptions = [
  { label: "Персик", value: "peach" },
  { label: "Лаванда", value: "lavender" },
  { label: "Зелёный (основной)", value: "primary" },
  { label: "Нейтральный", value: "neutral" },
];

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "Новость", plural: "Новости" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "_status"],
  },
  defaultSort: "-publishedAt",
  versions: { drafts: true },
  access: { read: publishedOrEditor },
  fields: [
    { name: "title", label: "Заголовок", type: "text", required: true },
    slugField(),
    {
      name: "excerpt",
      label: "Анонс",
      type: "text",
      required: true,
      admin: { description: "Короткий тизер для карточек списка новостей" },
    },
    {
      name: "category",
      label: "Категория",
      type: "text",
      admin: {
        position: "sidebar",
        description: 'Например "продукт", "событие"',
      },
    },
    {
      name: "tint",
      label: "Цвет карточки",
      type: "select",
      required: true,
      defaultValue: "primary",
      options: tintOptions,
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      label: "Дата публикации",
      type: "date",
      required: true,
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "relatedProduct",
      label: "Товар, о котором новость",
      type: "relationship",
      relationTo: "products",
      admin: { position: "sidebar" },
    },
    { name: "cover", label: "Обложка", type: "upload", relationTo: "media" },
    { name: "content", label: "Текст", type: "richText", required: true },
  ],
};
