import type { GlobalConfig } from "payload";

export const Partners: GlobalConfig = {
  slug: "partners",
  label: "Партнёры",
  access: { read: () => true },
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
          required: true,
        },
        { name: "url", label: "Ссылка", type: "text" },
      ],
    },
  ],
};
