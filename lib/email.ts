// Contact form delivery — env-based only, never hardcode keys here.
// Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and
// NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local to send via EmailJS.
// Without them, the form falls back to opening the visitor's email client.
import emailjs from "@emailjs/browser";

export function emailJsConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
}

export async function sendEmail(form: HTMLFormElement) {
  return emailjs.sendForm(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
    form,
    { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string }
  );
}
