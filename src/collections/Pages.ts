import type { CollectionConfig } from "payload";
import { slugField } from "./fields";

/** Free-form text pages: "О компании" and the legal documents. */
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Страница", plural: "Страницы" },
  access: { read: () => true },
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", label: "Заголовок", type: "text", required: true },
    slugField(),
    { name: "content", label: "Текст", type: "richText" },
  ],
};
