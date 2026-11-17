"use client";

import { useEffect, useState } from "react";
import { Boxes, Code2, GraduationCap, Lightbulb, MapPin, Sparkles, Truck, Wrench } from "lucide-react";
import { client, EDUCATION_QUERY, EXPERIENCE_QUERY } from "@/lib/sanity";
import { fallbackEducation, fallbackExperience } from "@/lib/fallback-data";
import type { Education, Experience } from "@/lib/types";
import { Reveal, SectionHeading } from "@/components/ui";

const STRENGTHS = [
  { icon: Code2, title: "Builds real tools", text: "Full-stack apps and internal tooling that people actually use every day — not just demos." },
  { icon: Truck, title: "Knows the floor", text: "Parcel operations, dispatch and warehousing first-hand, so the software fits the work instead of fighting it." },
  { icon: Lightbulb, title: "Practical problem-solver", text: "Starts from the bottleneck — a queue, a form, a handoff — and automates the boring part." },
  { icon: Wrench, title: "Documents & improves", text: "SOPs, audit-ready records, testing and change notes, so improvements stick after handover." },
];

export function About() {
  const [education, setEducation] = useState<Education[]>(fallbackEducation);
  const [experience, setExperience] = useState<Experience[]>(fallbackExperience);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [edu, exp] = await Promise.all([client.fetch(EDUCATION_QUERY), client.fetch(EXPERIENCE_QUERY)]);
        if (!alive) return;
        if (Array.isArray(edu) && edu.length) setEducation(edu);
        if (Array.isArray(exp) && exp.length) setExperience(exp);
      } catch { /* last-known Sanity snapshot stays in place */ }
    })();
    return () => { alive = false; };
  }, []);

  const latestEdu = education[0];
  const latestRole = experience.find((e) => e.company.toLowerCase().includes("gobolt")) ?? experience[0];

  return (
    <section id="about" className="scroll-mt-24 py-28 sm:py-40" aria-label="About me">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Chapter I — About" title="A developer who has worked the floor, too." accent="worked." marker="ABOUT"
          intro="Code meets the warehouse floor — I build the tools and I know the work." />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Reveal className="card-surface p-6 md:col-span-2 md:row-span-2">
            <p className="eyebrow">Professional summary</p>
            <p className="mt-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              Computer Science graduate (B.Tech) with a graduate certificate in Software &amp; Database Development — Parcel Team Lead and Full Stack Developer. Software on one side, sorting, dispatch and route coordination on the other.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              The clearest example: the Driver Check-in System I built for GoBolt — a real bottleneck, a tool that removes it, and a team that keeps using it.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip"><GraduationCap className="h-3.5 w-3.5" /> B.Tech, Computer Science &amp; Engineering</span>
              <span className="chip"><MapPin className="h-3.5 w-3.5" /> Mississauga, Ontario</span>
              <span className="chip"><Boxes className="h-3.5 w-3.5" /> Parcel Team Lead, GoBolt</span>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="card-surface bg-amber-600 !border-0 p-6 text-white dark:!bg-amber-600">
            <Sparkles className="h-6 w-6" />
            <p className="mt-4 text-lg font-semibold leading-snug">Currently</p>
            <p className="mt-2 text-sm leading-relaxed text-amber-100">
              {latestRole ? `${latestRole.title} — ${latestRole.company}, ${latestRole.location}.` : "Available immediately."} Open to full-stack, frontend and operations-technology roles.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">Available immediately</p>
          </Reveal>

          <Reveal delay={0.14} className="card-surface p-6">
            <GraduationCap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <p className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">Education</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {latestEdu ? `${latestEdu.degree} — ${latestEdu.field}, ${latestEdu.institution}.` : "Loyalist College and I.K. Gujral Punjab Technical University."}
            </p>
          </Reveal>

          {STRENGTHS.map((s, i) => (
            <Reveal key={s.title} delay={0.05 * i} className="card-surface group p-6 transition hover:-translate-y-1">
              <s.icon className="h-6 w-6 text-amber-600 transition group-hover:scale-110 dark:text-amber-400" />
              <p className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{s.text}</p>
            </Reveal>
          ))}
        </div>

        {/* Logistics × Web — where the two sides combine (real examples only). */}
        <Reveal className="mt-10">
          <div className="card-surface grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow">Logistics × Web</p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-stone-900 dark:text-stone-50 sm:text-4xl">Where the two sides <em className="serif-accent text-amber-700 dark:text-amber-500">meet.</em></h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">The floor finds the bottleneck. The code removes it. Three times that actually happened:</p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                <li><strong className="text-stone-900 dark:text-white">Driver Check-in System — GoBolt.</strong> Dock chaos → a check-in, queue and serving board the whole warehouse runs on.</li>
                <li><strong className="text-stone-900 dark:text-white">Internal tools — GoBolt.</strong> Daily productivity and exception reports, audit-ready records, and the tools the team tracks work with.</li>
                <li><strong className="text-stone-900 dark:text-white">ERP Next — education.</strong> A full-stack system for an institute: registration, fees and payroll in one place.</li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-xl">
              <img src="/assets/route-map.svg" alt="Stylised route map from warehouse to destination" className="h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
