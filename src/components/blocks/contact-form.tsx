"use client";

import { type FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { type Copy, ResponsiveText } from "@/components/ui/responsive-text";
import { SafeLink } from "@/components/ui/safe-link";
import { Textarea } from "@/components/ui/textarea";
import {
  type ContactErrorMessages,
  type ContactErrors,
  type ContactField,
  type ContactFormValues,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  validateContactForm,
  validateField,
} from "@/lib/validate-contact";
import { type NavItem } from "./types";

export type { ContactFormValues } from "@/lib/validate-contact";

export interface ContactFormCopy {
  title: string;
  /** May be shorter on mobile: { desktop, mobile }. */
  description: Copy;
  /** Visible field labels — used by the `card` variant only. */
  nameLabel?: string;
  phoneLabel?: string;
  messageLabel?: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  consent: Copy;
  submit: string;
  submitting: string;
  errors: ContactErrorMessages;
}

export interface ContactFormProps {
  /**
   * `panel` (home): big rounded panel with title, lead and quick-contact
   * pills beside pill-shaped fields. `card` (contacts page): just the form
   * in a card, with visible labels and rounded-rectangle fields.
   */
  variant?: "panel" | "card";
  copy: ContactFormCopy;
  /** Quick-contact pills next to the form (desktop only), e.g. tel: / mailto: links. */
  contacts?: NavItem[];
  /**
   * Called with trimmed values once validation passes. Sending is up to the
   * caller — this block has no submit logic of its own.
   */
  onSubmit?: (values: ContactFormValues) => void;
  /** Shows the loading state on the submit button while the caller sends. */
  isSubmitting?: boolean;
}

const emptyValues: ContactFormValues = {
  name: "",
  phone: "",
  message: "",
  consent: false,
};

const pillField =
  "h-[54px] rounded-full px-5 text-[15px] tablet:h-[58px] tablet:px-[22px] tablet:text-[16px]";

export function ContactForm({
  variant = "panel",
  copy,
  contacts = [],
  onSubmit,
  isSubmitting = false,
}: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const refs = {
    name: nameRef,
    phone: phoneRef,
    message: messageRef,
    consent: consentRef,
  };

  /** Re-validates one field; used to clear an error as soon as it's fixed. */
  const revalidate = (field: ContactField, next: ContactFormValues) => {
    const error = validateField(field, next, copy.errors);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const update = <F extends ContactField>(
    field: F,
    value: ContactFormValues[F],
  ) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field]) revalidate(field, next);
  };

  const handleBlur = (field: ContactField) => {
    // Don't nag about untouched required fields — only flag bad input.
    if (values[field] !== emptyValues[field]) revalidate(field, values);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const found = validateContactForm(values, copy.errors);
    setErrors(found);

    const firstInvalid = (
      ["name", "phone", "message", "consent"] as const
    ).find((field) => found[field]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }

    onSubmit?.({
      name: values.name.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
      consent: values.consent,
    });
  };

  const isCard = variant === "card";
  // Placeholders are not labels: the panel variant has no visible label, so
  // give its fields an accessible name; the card variant uses real labels.
  const nameA11y = isCard ? {} : { "aria-label": copy.namePlaceholder };
  const phoneA11y = isCard ? {} : { "aria-label": copy.phonePlaceholder };
  const messageA11y = isCard ? {} : { "aria-label": copy.messagePlaceholder };

  const formFields = (
    <>
      <div
        className={
          isCard
            ? "tablet:grid-cols-2 tablet:gap-4 grid gap-3.5"
            : "tablet:grid-cols-2 tablet:gap-3.5 grid gap-3"
        }
      >
        <Input
          ref={nameRef}
          name="name"
          type="text"
          autoComplete="name"
          maxLength={NAME_MAX_LENGTH}
          label={isCard ? copy.nameLabel : undefined}
          {...nameA11y}
          placeholder={copy.namePlaceholder}
          value={values.name}
          error={errors.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          className={isCard ? undefined : pillField}
        />
        <Input
          ref={phoneRef}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          label={isCard ? copy.phoneLabel : undefined}
          {...phoneA11y}
          placeholder={copy.phonePlaceholder}
          value={values.phone}
          error={errors.phone}
          onChange={(e) => update("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          className={isCard ? undefined : pillField}
        />
      </div>
      <Textarea
        ref={messageRef}
        name="message"
        rows={isCard ? 5 : 4}
        maxLength={MESSAGE_MAX_LENGTH}
        label={isCard ? copy.messageLabel : undefined}
        {...messageA11y}
        placeholder={copy.messagePlaceholder}
        value={values.message}
        error={errors.message}
        onChange={(e) => update("message", e.target.value)}
        onBlur={() => handleBlur("message")}
        className={
          isCard
            ? undefined
            : "tablet:rounded-[28px] tablet:px-[22px] tablet:py-5 tablet:text-[16px] rounded-[26px] px-5 py-[18px] text-[15px]"
        }
      />
      <div className={isCard ? undefined : "px-1.5"}>
        <Checkbox
          ref={consentRef}
          name="consent"
          checked={values.consent}
          error={errors.consent}
          onChange={(e) => update("consent", e.target.checked)}
          label={
            <ResponsiveText
              text={copy.consent}
              className="text-text-muted tablet:text-[13px] text-xs leading-normal"
            />
          }
        />
      </div>
      <Button
        type="submit"
        variant={isCard ? "primary" : "dark"}
        loading={isSubmitting}
        loadingText={copy.submitting}
        className="tablet:h-[58px] h-[54px] w-full text-[16px]"
      >
        {copy.submit}
      </Button>
    </>
  );

  if (isCard) {
    return (
      <form
        noValidate
        onSubmit={handleSubmit}
        className="bg-surface tablet:gap-4 tablet:rounded-[28px] tablet:p-9 flex flex-col gap-3.5 rounded-[24px] p-[22px]"
      >
        <h2 className="font-heading tablet:text-[26px] text-[22px] font-medium">
          {copy.title}
        </h2>
        {formFields}
      </form>
    );
  }

  return (
    <section className="bg-surface tablet:gap-14 tablet:rounded-xl tablet:p-14 mx-auto grid max-w-[1360px] gap-[18px] rounded-lg px-[22px] py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="flex flex-col gap-[18px]">
        <h2 className="font-heading text-h1">{copy.title}</h2>
        <ResponsiveText
          as="p"
          text={copy.description}
          className="text-text-muted tablet:text-[17px] max-w-[360px] text-[15px] leading-[1.6]"
        />
        {contacts.length > 0 && (
          <ul className="tablet:flex hidden flex-col gap-2.5 pt-2.5">
            {contacts.map((c) => (
              <li key={c.href}>
                <SafeLink
                  href={c.href}
                  className="bg-primary-tint text-text hover:bg-primary-tint-hover focus-visible:shadow-focus-button flex h-[52px] items-center rounded-full px-6 text-base font-bold transition-colors focus-visible:outline-none"
                >
                  {c.label}
                </SafeLink>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="tablet:gap-3.5 flex flex-col gap-3"
      >
        {formFields}
      </form>
    </section>
  );
}
