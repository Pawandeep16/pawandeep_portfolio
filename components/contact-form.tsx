"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { emailJsConfigured, sendEmail } from "@/lib/email";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    setStatus("sending");
    if (emailJsConfigured()) {
      try {
        await sendEmail(form);
        setStatus("sent");
        setNote("Message sent — thank you. I'll get back to you soon.");
        form.reset();
      } catch {
        setStatus("error");
        setNote("Something went wrong sending via EmailJS. Please email me directly instead.");
      }
      return;
    }
    // No EmailJS configured: open the visitor's email client, pre-filled.
    window.location.href = `mailto:thandipawandeep@gmail.com?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
    setStatus("sent");
    setNote("Your email app should have opened with the message pre-filled. If it didn't, email me directly at thandipawandeep@gmail.com.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-left">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Your name</span>
          <Input type="text" name="name" placeholder="Your Name" required autoComplete="name" />
        </label>
        <label className="block text-left">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Your email</span>
          <Input type="email" name="email" placeholder="you@example.com" required autoComplete="email" />
        </label>
      </div>
      <label className="block text-left">
        <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</span>
        <Textarea name="message" placeholder="Tell me about the role, project, or idea…" required className="min-h-[150px]" />
      </label>
      <Button type="submit" className="w-full !rounded-full !py-3" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
      </Button>
      {status !== "idle" && status !== "sending" && (
        <p role="status" className={status === "sent" ? "text-sm text-emerald-600 dark:text-emerald-400" : "text-sm text-red-600 dark:text-red-400"}>{note}</p>
      )}
      {!emailJsConfigured() && status === "idle" && (
        <p className="text-xs text-zinc-500 dark:text-zinc-500">This form opens your email client — EmailJS isn&apos;t configured on this deployment yet.</p>
      )}
    </form>
  );
}
