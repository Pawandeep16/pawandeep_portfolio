"use client";

import { useEffect, useState } from "react";
import { GraduationCap, MapPin } from "lucide-react";
import { client, EDUCATION_QUERY } from "@/lib/sanity";
import { fallbackEducation } from "@/lib/fallback-data";
import type { Education } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/ui";

/**
 * Study — deliberately NOT a timeline. Degree cards with big serif degree
 * names and large mono GPA numerals, side by side. Visually distinct from
 * the Experience timeline so the two sections read differently.
 */
export function Education() {
  const [edu, setEdu] = useState<Education[]>(fallbackEducation);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch(EDUCATION_QUERY);
        if (alive && Array.isArray(data) && data.length) setEdu(data);
      } catch { /* snapshot stays */ }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section id="education" className="scroll-mt-24 py-28 sm:py-40" aria-label="Education">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Chapter III — Study" title="What I studied." accent="studied." marker="STUDY"
          intro="Two degrees, one through-line: build things that work." />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {edu.map((d, i) => (
            <Reveal key={d._id} delay={0.06 * i} className="card-surface group flex flex-col p-7 transition hover:-translate-y-1 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-md bg-amber-600/10 text-amber-600 dark:text-amber-400"><GraduationCap className="h-6 w-6" /></span>
                {d.gpa ? (
                  <span className="text-right">
                    <span className="block font-mono text-4xl font-bold tabular-nums text-stone-900 dark:text-white">{d.gpa}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">GPA</span>
                  </span>
                ) : null}
              </div>
              <h3 className="mt-6 font-display text-[clamp(1.6rem,3vw,2.25rem)] leading-[1.08] text-stone-900 dark:text-stone-50">{d.degree}</h3>
              <p className="mt-2 text-base font-semibold text-amber-700 dark:text-amber-500">{d.field}</p>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                {d.institution} · <MapPin className="mr-0.5 inline h-3.5 w-3.5" />{d.location} · {formatDate(d.startDate)} — {d.current ? "Present" : formatDate(d.endDate)}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{d.description}</p>
              {d.achievements?.length ? (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Achievements">
                  {d.achievements.map((a) => <li key={a} className="chip">{a}</li>)}
                </ul>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
