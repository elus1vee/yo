import type { CollectionConfig } from "payload";
import { slugField } from "./fields";

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "Новость", plural: "Новости" },
  access: { read: () => true },
  admin: { useAsTitle: "title", defaultColumns: ["title", "publishedAt"] },
  defaultSort: "-publishedAt",
  fields: [
    { name: "title", label: "Заголовок", type: "text", required: true },
    slugField(),
    {
      name: "publishedAt",
      label: "Дата публикации",
      type: "date",
      required: true,
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    { name: "cover", label: "Обложка", type: "upload", relationTo: "media" },
    { name: "content", label: "Текст", type: "richText" },
  ],
};
