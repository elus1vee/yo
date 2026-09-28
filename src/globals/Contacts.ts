import type { GlobalConfig } from "payload";

/** Content of the "Контакты" page and the contact facts shown in the footer. */
export const Contacts: GlobalConfig = {
  slug: "contacts",
  label: "Контакты",
  access: { read: () => true },
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
    { name: "address", label: "Адрес", type: "text", required: true },
    { name: "phone", label: "Телефон основной", type: "text", required: true },
    { name: "phoneSecond", label: "Телефон дополнительный", type: "text" },
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "mapCaption",
      label: "Подпись карты",
      type: "text",
      admin: { description: "Пока карта — заглушка; используется как подпись" },
    },
  ],
};
