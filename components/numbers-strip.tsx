"use client";

import { fallbackCertifications, fallbackGallery, fallbackProjects } from "@/lib/fallback-data";
import { anton } from "@/lib/fonts";
import { ScrollReveal } from "@/components/scroll-reveal";

const TOOLS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Google Apps Script", "Google Sheets",
  "Figma", "Adobe Illustrator", "Photoshop", "SQL", "MongoDB", "Node.js", "Tailwind CSS", "Git",
];

export function NumbersStrip() {
  const stats = [
    { value: String(fallbackProjects.length + 1), label: "Projects shipped" },
    { value: String(fallbackGallery.length), label: "Artworks" },
    { value: String(fallbackCertifications.length), label: "Certifications" },
    { value: "3", label: "Roles" },
    { value: "2", label: "Degrees" },
  ];
  return (
    <section aria-label="By the numbers" className="border-y border-zinc-200/70 py-20 dark:border-white/10 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="eyebrow text-center">00 — By the numbers</p>
          <dl className="mt-8 grid grid-cols-2 gap-6 text-center sm:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="order-2 mt-2 block text-sm text-zinc-500 dark:text-zinc-400">{s.label}</dt>
                <dd className={`${anton.className} text-5xl tracking-tight text-zinc-900 dark:text-white sm:text-6xl`}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
        <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]" aria-hidden="true">
          <div className="animate-marquee flex w-max gap-3">
            {[...TOOLS, ...TOOLS].map((t, i) => (
              <span key={`${t}-${i}`} className="chip !px-4 !py-2 !text-sm">{t}</span>
            ))}
          </div>
        </div>
        <p className="sr-only">Tools: {TOOLS.join(", ")}.</p>
      </div>
    </section>
  );
}
