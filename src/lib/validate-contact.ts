/**
 * Client-side validation for the contact form. This is UX only — whatever
 * receives the submission must validate and sanitize again on the server.
 */

export interface ContactFormValues {
  name: string;
  phone: string;
  message: string;
  consent: boolean;
}

export type ContactField = keyof ContactFormValues;
export type ContactErrors = Partial<Record<ContactField, string>>;

export interface ContactErrorMessages {
  nameRequired: string;
  phoneRequired: string;
  phoneInvalid: string;
  messageTooLong: string;
  consentRequired: string;
}

export const NAME_MAX_LENGTH = 100;
export const MESSAGE_MAX_LENGTH = 2000;

/**
 * Belarus numbers: "+375 XX XXX XX XX", also accepted as "375…" or the
 * local "80…"; spaces, dashes and parentheses are ignored.
 */
export function isValidPhone(value: string): boolean {
  const v = value.trim();
  if (!/^[+\d\s()-]+$/.test(v)) return false;
  return /^(?:\+?375|80)\d{9}$/.test(v.replace(/[\s()-]/g, ""));
}

export function validateField(
  field: ContactField,
  values: ContactFormValues,
  messages: ContactErrorMessages,
): string | undefined {
  switch (field) {
    case "name":
      return values.name.trim() ? undefined : messages.nameRequired;
    case "phone":
      if (!values.phone.trim()) return messages.phoneRequired;
      return isValidPhone(values.phone) ? undefined : messages.phoneInvalid;
    case "message":
      return values.message.length > MESSAGE_MAX_LENGTH
        ? messages.messageTooLong
        : undefined;
    case "consent":
      return values.consent ? undefined : messages.consentRequired;
  }
}

const FIELDS: ContactField[] = ["name", "phone", "message", "consent"];

export function validateContactForm(
  values: ContactFormValues,
  messages: ContactErrorMessages,
): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of FIELDS) {
    const error = validateField(field, values, messages);
    if (error) errors[field] = error;
  }
  return errors;
}
