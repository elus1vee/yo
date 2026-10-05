"use client";

import { useState } from "react";
import { sendContact } from "@/lib/send-contact";
import {
  ContactForm,
  type ContactFormProps,
  type ContactFormValues,
} from "./contact-form";

/** ContactForm wired to the `sendContact` server action (mails the submission). */
export function ContactFormConnected(
  props: Omit<ContactFormProps, "onSubmit" | "isSubmitting" | "status">,
) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactFormProps["status"]>();

  const handleSubmit = async (values: ContactFormValues) => {
    setSubmitting(true);
    setStatus(undefined);
    try {
      const result = await sendContact(values);
      if (result.ok) {
        setStatus("success");
        return true;
      }
      setStatus(result.reason === "rate-limited" ? "rate-limited" : "error");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
    return false;
  };

  return (
    <ContactForm
      {...props}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      status={status}
    />
  );
}
