import type { CollectionConfig } from "payload";
import { isEditor } from "./access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Файл", plural: "Медиа" },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 800 },
    ],
    adminThumbnail: "thumbnail",
  },
  fields: [
    {
      name: "alt",
      label: "Описание (alt)",
      type: "text",
      required: true,
    },
  ],
};
