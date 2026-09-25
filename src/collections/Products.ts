import type { CollectionConfig } from "payload";
import { publishedOrEditor } from "./access";
import { slugField } from "./fields";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Товар", plural: "Товары" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "categoryAnimal", "categoryType", "status"],
  },
  access: { read: publishedOrEditor },
  fields: [
    { name: "title", label: "Название", type: "text", required: true },
    slugField(),
    {
      name: "status",
      label: "Статус",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Черновик", value: "draft" },
        { label: "Опубликован", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "categoryAnimal",
      label: "Для кого",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Кошки", value: "cats" },
        { label: "Собаки", value: "dogs" },
        { label: "Грызуны", value: "rodents" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "categoryType",
      label: "Тип товара",
      type: "select",
      required: true,
      options: [
        { label: "Наполнители", value: "litter" },
        { label: "Лакомства", value: "treats" },
        { label: "Корма", value: "food" },
        { label: "Косметика", value: "care" },
        { label: "Для дома", value: "home" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "images",
      label: "Фото",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    { name: "description", label: "Описание", type: "richText" },
    {
      name: "variants",
      label: "Варианты",
      type: "array",
      fields: [
        { name: "volume", label: "Объём", type: "text" },
        { name: "scent", label: "Аромат", type: "text" },
      ],
    },
    {
      name: "specs",
      label: "Характеристики",
      type: "group",
      fields: [
        { name: "weight", label: "Вес", type: "text" },
        { name: "volume", label: "Объём", type: "text" },
      ],
    },
  ],
};
