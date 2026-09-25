import type { ContactDetailsProps } from "@/components/blocks/contact-details";
import type { ContactFormCopy } from "@/components/blocks/contact-form";
import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { MessengerKind } from "@/components/blocks/types";
import { telHref } from "@/lib/safe-url";
import { ADDRESS, EMAIL, PHONE_MAIN, PHONE_SECOND, header } from "./site";

/** Copy of the Contacts page (Yo Contacts.dc.html). */

export const contactsIntro: PageIntroProps = {
  eyebrow: "Контакты",
  title: "Свяжитесь с нами",
  description: {
    desktop:
      "Вопросы о товарах, сотрудничестве и поставках — ответим в рабочие часы.",
    mobile: "Ответим в рабочие часы.",
  },
};

const messengerNames: Record<MessengerKind, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  viber: "Viber",
};

export const contactDetails: ContactDetailsProps = {
  items: [
    {
      icon: "pin",
      tint: "primary",
      label: "Адрес",
      lines: [{ text: ADDRESS }],
    },
    {
      icon: "phone",
      tint: "peach",
      label: "Телефоны",
      lines: [
        { text: PHONE_MAIN, href: telHref(PHONE_MAIN) },
        { text: PHONE_SECOND, href: telHref(PHONE_SECOND) },
      ],
    },
    {
      icon: "mail",
      tint: "lavender",
      label: "Email",
      lines: [{ text: EMAIL, href: `mailto:${EMAIL}` }],
    },
  ],
  messengers: {
    label: "Написать в мессенджер",
    // same (still placeholder) links as in the header
    links: header.messengers.map((m) => ({
      ...m,
      text: messengerNames[m.kind],
    })),
  },
  map: { caption: `карта: ${ADDRESS.replace("г. Минск, ", "")}` },
};

export const contactsForm: ContactFormCopy = {
  title: "Форма обратной связи",
  description: "",
  nameLabel: "Имя",
  phoneLabel: "Телефон",
  messageLabel: "Сообщение",
  namePlaceholder: "Как к вам обращаться",
  phonePlaceholder: "+375 __ ___ __ __",
  messagePlaceholder: "Коротко о вопросе",
  consent: {
    desktop:
      "Согласен на обработку персональных данных в соответствии с политикой конфиденциальности.",
    mobile: "Согласен на обработку персональных данных.",
  },
  submit: "Отправить",
  submitting: "Отправка…",
  errors: {
    nameRequired: "Введите имя",
    phoneRequired: "Введите телефон",
    phoneInvalid: "Проверьте формат номера: +375 XX XXX XX XX",
    messageTooLong: "Сообщение слишком длинное",
    consentRequired: "Отметьте согласие на обработку данных",
  },
};
