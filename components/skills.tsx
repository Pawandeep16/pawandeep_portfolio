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
          intro="Grouped by craft — tools I've actually used." />
        <div className="mt-10 space-y-4">
          {cats.map((cat, i) => {
            const Icon = ICONS[cat.icon] ?? Code2;
            return (
              <Reveal key={cat._id} delay={0.04 * i}>
                <div className="card-surface flex flex-col gap-4 p-6 transition hover:-translate-y-0.5 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex shrink-0 items-center gap-3 sm:w-72">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-600/10 text-amber-600 dark:text-amber-400"><Icon className="h-5 w-5" /></span>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{cat.title.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").trim()}</h3>
                    <span className="ml-auto rounded-full bg-zinc-900/5 px-2 py-0.5 font-mono text-[11px] font-semibold text-zinc-500 dark:bg-white/10 dark:text-zinc-400 sm:ml-0">{cat.skills.length}</span>
                  </div>
                  <ul className="flex flex-1 flex-wrap gap-2">
                    {cat.skills.map((sk) => (
                      <li key={sk.name} className="chip !px-3 !py-1.5 !text-[13px]">{sk.name}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="card-surface mt-4 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6">
          <p className="shrink-0 text-sm font-semibold text-zinc-900 dark:text-white sm:w-72">Also in my toolkit</p>
          <ul className="flex flex-1 flex-wrap gap-2">
            {TOOLKIT.map((t) => <li key={t} className="chip">{t}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
