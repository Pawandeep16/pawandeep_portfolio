"use client";

import { useEffect, useState } from "react";
import { Brush, Code2, Database, Image as ImageIcon, Users, Zap } from "lucide-react";
import { client, SKILLS_QUERY } from "@/lib/sanity";
import { fallbackSkills } from "@/lib/fallback-data";
import type { SkillCategory } from "@/lib/types";
import { Reveal, SectionHeading } from "@/components/ui";

const ICONS: Record<string, typeof Code2> = {
  Code: Code2, Database, Brush, Image: ImageIcon, Zap, Calendar: Users,
};

const TOOLKIT = ["Shopify Liquid", "SAP Fundamentals", "OMS", "WMS", "TMS", "Excel", "SharePoint", "Microsoft Office", "Google Workspace", "Looker Studio"];

export function Skills() {
  const [cats, setCats] = useState<SkillCategory[]>(fallbackSkills);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch(SKILLS_QUERY);
        if (alive && Array.isArray(data) && data.length) setCats(data);
      } catch { /* snapshot stays */ }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section id="skills" className="scroll-mt-24 py-28 sm:py-40" aria-label="Technical skills">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="02 — Skills" title="What I work with." accent="work" marker="SKILLS"
          intro="What I build with — grouped by craft, no scores, just tools I've actually used." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((cat, i) => {
            const Icon = ICONS[cat.icon] ?? Code2;
            return (
              <Reveal key={cat._id} delay={0.05 * i} className="card-surface group p-6 transition hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-600/10 text-amber-600 dark:text-amber-400"><Icon className="h-5 w-5" /></span>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{cat.title.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").trim()}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <li key={s.name} className="chip !px-3 !py-1.5 !text-[13px]">{s.name}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="card-surface mt-4 p-6">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Also in my toolkit — from operations &amp; coursework</p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">From my resume and day-to-day operations work.</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {TOOLKIT.map((t) => <li key={t} className="chip">{t}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
