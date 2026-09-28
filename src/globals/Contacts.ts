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
      admin: {
        description:
          "Название карты для читалок с экрана; на сайте не показывается",
      },
    },
    {
      name: "mapCoordinates",
      label: "Точка на карте",
      type: "group",
      admin: {
        description:
          "Без координат метка ищется по адресу — с ними появляется сразу, в нужном месте. Чтобы узнать: откройте yandex.ru/maps, найдите нужную точку, кликните по ней правой кнопкой и выберите «Что здесь?» — внизу появятся координаты. Первое число — широта (поле «Широта»), второе — долгота (поле «Долгота»).",
      },
      fields: [
        { name: "lat", label: "Широта (latitude)", type: "number" },
        { name: "lng", label: "Долгота (longitude)", type: "number" },
      ],
    },
  ],
};
