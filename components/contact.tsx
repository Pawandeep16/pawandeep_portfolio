"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { fallbackHero, fallbackSocialLinks } from "@/lib/fallback-data";
import { ContactForm } from "@/components/contact-form";
import { Reveal, SectionHeading } from "@/components/ui";

export function Contact() {
  const hero = fallbackHero;
  const socials = fallbackSocialLinks;
  const iconFor = (name: string) => (name === "LinkedIn" ? Linkedin : name === "GitHub" ? Github : Mail);
  return (
    <section id="contact" className="scroll-mt-24 py-28 sm:py-40" aria-label="Contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Chapter VII — Contact" title="Let's build something useful." accent="useful." marker="CONTACT"
          intro="Have a role, a project, or a process that needs fixing? I'd love to hear about it — fill in the form or reach me directly." />
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-4">
            {[
              { label: "Email", value: hero.email, href: `mailto:${hero.email}`, Icon: Mail },
              { label: "Phone", value: hero.phone, href: "tel:+14168840993", Icon: Phone },
              { label: "Location", value: "Mississauga, Ontario, Canada", href: undefined, Icon: MapPin },
            ].map((c) => (
              <div key={c.label} className="card-surface flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-600/10 text-amber-600 dark:text-amber-400"><c.Icon className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">{c.label}</p>
                  {c.href ? <a href={c.href} className="font-medium text-zinc-900 hover:text-amber-600 dark:text-white dark:hover:text-amber-400">{c.value}</a> : <p className="font-medium text-zinc-900 dark:text-white">{c.value}</p>}
                </div>
              </div>
            ))}
            <div className="card-surface flex items-center gap-2 p-5">
              {socials.map((s) => {
                const Icon = iconFor(s.name);
                return <motion.a key={s._id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} whileHover={{ scale: 1.12, rotate: 4, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="grid h-11 w-11 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition hover:-translate-y-0.5 hover:border-amber-500 hover:text-amber-600 dark:border-white/10 dark:text-zinc-300 dark:hover:border-amber-400 dark:hover:text-amber-400"><Icon className="h-5 w-5" /></motion.a>;
              })}
              <motion.a href={`mailto:${hero.email}`} aria-label="Email" whileHover={{ scale: 1.12, rotate: 4, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="grid h-11 w-11 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition hover:-translate-y-0.5 hover:border-amber-500 hover:text-amber-600 dark:border-white/10 dark:text-zinc-300 dark:hover:border-amber-400 dark:hover:text-amber-400"><Mail className="h-5 w-5" /></motion.a>
            </div>
            <div className="card-surface bg-gradient-to-br from-amber-600 to-orange-600 !border-0 p-6 text-white">
              <Image src="/assets/web-closed-box.svg" alt="Closed parcel box" width={375} height={375} className="mb-4 h-16 w-16 rounded-lg bg-white/90 p-1.5" />
              <p className="text-lg font-semibold">Hire me</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-100">Available immediately for full-stack, frontend and operations-technology roles in the Greater Toronto Area.</p>
              <a href="/resume.pdf" download className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-50">Download resume</a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="card-surface p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Send a message</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">I&apos;ll get back to you as soon as I can.</p>
            <div className="mt-6"><ContactForm /></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
