import type { Metadata } from "next";
import { CardGrid } from "@/components/blocks/card-grid";
import { ContactDetails } from "@/components/blocks/contact-details";
import { ContactForm } from "@/components/blocks/contact-form";
import { PageIntro } from "@/components/blocks/page-intro";
import { Section } from "@/components/blocks/section";
import {
  contactDetails,
  contactsForm,
  contactsIntro,
} from "@/content/contacts";

export const metadata: Metadata = { title: "Контакты" };

export default function ContactsPage() {
  return (
    <>
      <PageIntro {...contactsIntro} />
      <Section inset="page" rhythm="form">
        <CardGrid layout="contacts">
          <ContactDetails {...contactDetails} />
          <ContactForm variant="card" copy={contactsForm} />
        </CardGrid>
      </Section>
    </>
  );
}
