import type { CollectionConfig } from "payload";
import { publishedOrEditor } from "./access";
import { slugField } from "./fields";

/** Same 4 colors used across the site for product-line photos/cards. */
const tintOptions = [
  { label: "Персик", value: "peach" },
  { label: "Лаванда", value: "lavender" },
  { label: "Зелёный (основной)", value: "primary" },
  { label: "Нейтральный", value: "neutral" },
];

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Товар", plural: "Товары" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "categoryAnimal", "categoryType", "_status"],
  },
  // Draft/published state is Payload's own (`_status`), which is what Live
  // Preview needs to show unsaved edits before a document is published.
  versions: { drafts: true },
  access: { read: publishedOrEditor },
  fields: [
    { name: "title", label: "Название", type: "text", required: true },
    slugField(),
    {
      name: "featured",
      label: "Показывать на главной",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Блок «Любимое у покупателей» на главной странице",
      },
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
      name: "tint",
      label: "Цвет карточки",
      type: "select",
      required: true,
      defaultValue: "primary",
      options: tintOptions,
      admin: { position: "sidebar" },
    },
    {
      name: "subtitle",
      label: "Подзаголовок",
      type: "text",
      admin: { description: 'Короткое пояснение, например "комкующийся"' },
    },
    {
      name: "badge",
      label: "Плашка на карточке",
      type: "text",
      admin: {
        position: "sidebar",
        description: 'Например "Хит"; пусто — плашки нет',
      },
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
      label: "Варианты (объём / аромат)",
      type: "array",
      fields: [
        { name: "volume", label: "Объём или вес", type: "text" },
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
