"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { CardGrid } from "@/components/blocks/card-grid";
import { ContactDetails } from "@/components/blocks/contact-details";
import { type ContactFormCopy } from "@/components/blocks/contact-form";
import { ContactFormConnected } from "@/components/blocks/contact-form-connected";
import { PageIntro } from "@/components/blocks/page-intro";
import { Section } from "@/components/blocks/section";
import { type Messenger } from "@/components/blocks/types";
import { contactsToView } from "@/lib/view/contacts";
import type { DeepPartial } from "@/lib/utils";
import type { Contact } from "@/payload-types";

interface ContactsPageLiveProps {
  initialContacts: DeepPartial<Contact>;
  /** Not part of the Contacts global (it's Header's), so not live-updated. */
  messengers: Messenger[];
  formCopy: ContactFormCopy;
}

/** Whole Contacts page body — see ProductDetailLive for how/why. */
export function ContactsPageLive({
  initialContacts,
  messengers,
  formCopy,
}: ContactsPageLiveProps) {
  const { data } = useLivePreview<DeepPartial<Contact>>({
    initialData: initialContacts,
    serverURL: typeof window !== "undefined" ? window.location.origin : "",
    depth: 0,
  });
  const { intro, details } = contactsToView(data, messengers);

  return (
    <>
      <PageIntro {...intro} />
      <Section inset="page" rhythm="form">
        <CardGrid layout="contacts">
          <ContactDetails {...details} />
          <ContactFormConnected variant="card" copy={formCopy} />
        </CardGrid>
      </Section>
    </>
  );
}
