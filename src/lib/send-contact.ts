"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import {
  type ContactErrorMessages,
  type ContactFormValues,
  validateContactForm,
} from "@/lib/validate-contact";

/**
 * Server action behind the contact forms: re-validates (the client check is
 * UX only) and mails the submission to CONTACT_FORM_TO over SMTP.
 *
 * Env: CONTACT_FORM_TO, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD,
 * SMTP_FROM — see .env.example. Without SMTP_HOST, outside production, the
 * message is only logged so local development works without a mail server.
 */

export type SendContactResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "rate-limited" | "send-failed" };

const noMessages: ContactErrorMessages = {
  nameRequired: "name",
  phoneRequired: "phone",
  phoneInvalid: "phone",
  emailRequired: "email",
  emailInvalid: "email",
  messageTooLong: "message",
  consentRequired: "consent",
};

// In-memory, per process: enough for a single-instance deployment.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_MAX) {
    attempts.set(ip, recent);
    return true;
  }
  recent.push(now);
  attempts.set(ip, recent);
  if (attempts.size > 1000) {
    for (const [key, times] of attempts) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) attempts.delete(key);
    }
  }
  return false;
}

function buildText(v: ContactFormValues): string {
  return [
    `Имя: ${v.name}`,
    `Телефон: ${v.phone}`,
    `Email: ${v.email}`,
    "Согласие на обработку персональных данных: да",
    "",
    v.message || "(без сообщения)",
  ].join("\n");
}

export async function sendContact(
  input: ContactFormValues,
): Promise<SendContactResult> {
  const values: ContactFormValues = {
    name: String(input?.name ?? "").trim(),
    phone: String(input?.phone ?? "").trim(),
    email: String(input?.email ?? "").trim(),
    message: String(input?.message ?? "").trim(),
    consent: input?.consent === true,
  };
  if (Object.keys(validateContactForm(values, noMessages)).length > 0) {
    return { ok: false, reason: "invalid" };
  }

  // Behind the reverse proxy the client address is the first X-Forwarded-For hop.
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return { ok: false, reason: "rate-limited" };

  const to = process.env.CONTACT_FORM_TO;
  const host = process.env.SMTP_HOST;

  if (!host) {
    if (process.env.NODE_ENV === "production" || !to) {
      console.error("[contact] SMTP_HOST / CONTACT_FORM_TO is not configured");
      return { ok: false, reason: "send-failed" };
    }
    console.log(
      `[contact] (no SMTP configured) would send to ${to}:\n${buildText(values)}`,
    );
    return { ok: true };
  }
  if (!to) {
    console.error("[contact] CONTACT_FORM_TO is not set");
    return { ok: false, reason: "send-failed" };
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const transport = nodemailer.createTransport({
    host,
    port,
    // 465 = implicit TLS; 587/25 start plain and upgrade via STARTTLS
    secure: port === 465,
    auth: user ? { user, pass: process.env.SMTP_PASSWORD } : undefined,
  });

  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM || user,
      to,
      replyTo: values.email,
      subject: `Заявка с сайта «Йо!» — ${values.name.replace(/\s+/g, " ")}`,
      text: buildText(values),
    });
    return { ok: true };
  } catch (err) {
    console.error("[contact] failed to send mail", err);
    return { ok: false, reason: "send-failed" };
  }
}
