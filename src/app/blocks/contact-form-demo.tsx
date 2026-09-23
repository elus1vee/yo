"use client";

import { useState } from "react";
import {
  ContactForm,
  type ContactFormCopy,
  type ContactFormValues,
} from "@/components/blocks/contact-form";

/**
 * Stands in for the real submit handler: fakes a request so the loading
 * state and the "valid" path are visible. Nothing is sent anywhere.
 */
export function ContactFormDemo({
  copy,
  contacts,
}: {
  copy: ContactFormCopy;
  contacts: { label: string; href: string }[];
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ContactFormValues | null>(null);

  const handleSubmit = (values: ContactFormValues) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(values);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-3">
      <ContactForm
        copy={copy}
        contacts={contacts}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      />
      {submitted && (
        <pre className="bg-surface text-text-muted overflow-x-auto rounded-md p-4 text-xs">
          onSubmit → {JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </div>
  );
}
