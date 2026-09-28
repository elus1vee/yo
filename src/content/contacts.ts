import type { ContactFormCopy } from "@/components/blocks/contact-form";

/**
 * Copy of the Contacts page's form (Yo Contacts.dc.html). The intro text and
 * contact details themselves come from the Payload "Контакты" global — see
 * src/lib/cms-content.ts.
 */
export const contactsForm: ContactFormCopy = {
  title: "Форма обратной связи",
  description: "",
  nameLabel: "Имя",
  phoneLabel: "Телефон",
  emailLabel: "Email",
  messageLabel: "Сообщение",
  namePlaceholder: "Как к вам обращаться",
  phonePlaceholder: "+375 __ ___ __ __",
  emailPlaceholder: "you@example.com",
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
    emailRequired: "Введите email",
    emailInvalid: "Проверьте формат email",
    messageTooLong: "Сообщение слишком длинное",
    consentRequired: "Отметьте согласие на обработку данных",
  },
};
