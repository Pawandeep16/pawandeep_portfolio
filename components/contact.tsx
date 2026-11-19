"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { fallbackHero, fallbackSocialLinks } from "@/lib/fallback-data";
import { ContactForm } from "@/components/contact-form";
import { Reveal, SectionHeading } from "@/components/ui";

/**
 * Contact — v25. The big dark tile is gone: it looked wrong in both
 * themes (a heavy black slab in light mode, a washed-out ghost box in
 * dark mode). Now the section is open like the rest of the site — a soft
 * amber wash at the top, contact rows on the left, the form on the right,
 * no enclosing box. The "Hire me" card lost its loud gradient for a
 * plain card with an availability pill.
 */
export function Contact() {
  const hero = fallbackHero;
  const socials = fallbackSocialLinks;
  const iconFor = (name: string) => (name === "LinkedIn" ? Linkedin : name === "GitHub" ? Github : Mail);
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-40" aria-label="Contact">
      {/* Soft amber wash at the top — warmth without a box. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(217,119,6,0.12),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Chapter VII — Contact" title="Let's build something useful." accent="useful." marker="CONTACT"
          intro="Have a role or a project? Fill in the form or reach me directly." />
        <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
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
            <div className="card-surface flex items-start gap-4 p-6">
              <Image src="/assets/web-closed-box.svg" alt="Closed parcel box" width={375} height={375} className="h-14 w-14 shrink-0 rounded-xl bg-amber-600/10 p-2" />
              <div>
                <p className="flex flex-wrap items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
                  Hire me
                  <span className="rounded-full bg-emerald-600/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Available immediately</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Full-stack, frontend and operations-technology roles in the Greater Toronto Area.</p>
                <a href="/resume.pdf" download className="btn-primary mt-4 !px-5 !py-2.5 !text-sm">Download resume</a>
              </div>
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
