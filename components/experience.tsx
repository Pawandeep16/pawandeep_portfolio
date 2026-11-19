"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, MapPin, Truck, Code2 } from "lucide-react";
import { client, EXPERIENCE_QUERY } from "@/lib/sanity";
import { fallbackExperience } from "@/lib/fallback-data";
import type { Experience } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/ui";

/** WORK ONLY — education lives in components/education.tsx now. */
export function Experience() {
  const [exp, setExp] = useState<Experience[]>(fallbackExperience);
  const [open, setOpen] = useState<Set<string>>(new Set());
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch(EXPERIENCE_QUERY);
        if (alive && Array.isArray(data) && data.length) setExp(data);
      } catch { /* snapshot stays */ }
    })();
    return () => { alive = false; };
  }, []);

  const items = [...exp].sort((a, b) => (b.endDate ?? b.startDate).localeCompare(a.endDate ?? a.startDate));

  return (
    <section id="experience" className="scroll-mt-24 py-28 sm:py-40" aria-label="Work experience">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Chapter II — Work" title="Where I've worked." accent="worked." marker="WORK"
          intro="Two worlds, one approach — warehouse floor + code." />

        {/* Logistics × Web dual strip */}
        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="card-surface flex gap-4 p-6">
            <Image src="/assets/warehouse.svg" alt="Warehouse dock" width={640} height={360} className="hidden h-20 w-28 shrink-0 rounded-lg object-cover sm:block" />
            <div>
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-stone-900 dark:text-white"><Truck className="h-4 w-4 text-amber-600" /> Logistics</p>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Dispatch, warehouse operations, route coordination — the floor where the software has to work.</p>
            </div>
          </div>
          <div className="card-surface flex gap-4 p-6">
            <Image src="/assets/web-delivery-truck.svg" alt="Delivery truck illustration" width={512} height={512} className="hidden h-20 w-20 shrink-0 rounded-lg bg-[#faf7f2] object-contain p-2 dark:bg-white/5 sm:block" />
            <div>
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-stone-900 dark:text-white"><Code2 className="h-4 w-4 text-amber-600" /> Web</p>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">React, Next.js, Apps Script — the tools that turn a floor problem into a system.</p>
            </div>
          </div>
        </Reveal>

        <ol className="mt-12 space-y-4">
          {items.map((e, i) => {
            const key = `${e.company}-${e.title}`;
            const isOpen = open.has(key);
            const bullets = e.achievements ?? [];
            const shownBullets = isOpen ? bullets : bullets.slice(0, 2);
            const tags = e.technologies ?? [];
            const shownTags = isOpen ? tags : tags.slice(0, 5);
            const collapsible = bullets.length > 2 || tags.length > 5;
            const isLogistics = /gobolt/i.test(e.company);
            return (
              <Reveal key={key} delay={0.04 * i} as="li">
                <article className="card-surface flex flex-col gap-5 p-6 transition hover:-translate-y-1 sm:flex-row sm:p-7">
                  <div className="shrink-0 sm:w-44 sm:border-r sm:border-stone-200 sm:pr-5 dark:sm:border-white/10">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                      {formatDate(e.startDate)} — {e.current ? "Present" : formatDate(e.endDate)}
                    </p>
                    {e.current && <span className="mt-2 inline-block rounded-full bg-emerald-600/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Current role</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{e.title}</h3>
                  <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {e.company} <span className="font-normal text-zinc-500 dark:text-zinc-400">· <MapPin className="mr-0.5 inline h-3.5 w-3.5" />{e.location}</span>
                    {isLogistics ? <span className="ml-2 rounded-md bg-amber-600/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">Logistics</span> : <span className="ml-2 rounded-md bg-stone-900/5 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-stone-600 dark:bg-white/10 dark:text-stone-300">Web</span>}
                  </p>
                  <p className={isOpen ? "mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400" : "mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"}>{e.description}</p>
                  {shownBullets.length ? (
                    <ul className="mt-4 space-y-1.5">
                      {shownBullets.map((b) => <li key={b} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />{b}</li>)}
                    </ul>
                  ) : null}
                  {shownTags.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies and tools">
                      {shownTags.map((t) => <li key={t} className="chip">{t}</li>)}
                    </ul>
                  ) : null}
                  {collapsible && (
                    <button type="button" aria-expanded={isOpen} onClick={() => setOpen((prev) => { const next = new Set(prev); if (next.has(key)) next.delete(key); else next.add(key); return next; })}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:underline dark:text-amber-400">
                      {isOpen ? "Show less" : "Read more"} <ChevronDown className={isOpen ? "h-4 w-4 rotate-180 transition" : "h-4 w-4 transition"} />
                    </button>
                  )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
