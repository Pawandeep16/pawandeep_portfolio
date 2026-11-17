"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { client, TESTIMONIALS_QUERY } from "@/lib/sanity";
import { fallbackTestimonials } from "@/lib/fallback-data";
import type { Testimonial } from "@/lib/types";
import { Reveal, SectionHeading } from "@/components/ui";

export function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(fallbackTestimonials);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch(TESTIMONIALS_QUERY);
        if (alive && Array.isArray(data) && data.length) setItems(data);
      } catch { /* snapshot stays */ }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section id="testimonials" className="scroll-mt-24 py-28 sm:py-40" aria-label="Testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Chapter VI — Kind words" title="What people say." accent="say." marker="VOICES"
          intro="What people I've worked with say." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t._id} delay={0.06 * i} className="card-surface flex flex-col p-6 sm:p-7">
              <Quote className="h-7 w-7 text-amber-600/60 dark:text-amber-400/60" aria-hidden="true" />
              <p className="mt-4 flex-1 leading-relaxed text-zinc-700 dark:text-zinc-300">&ldquo;{t.content.replace(/^"|"$/g, "")}&rdquo;</p>
              <div className="mt-6 flex items-center gap-1" aria-label={`Rated ${t.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className={s < t.rating ? "h-4 w-4 fill-amber-400 text-amber-400" : "h-4 w-4 text-zinc-300 dark:text-zinc-600"} aria-hidden="true" />
                ))}
              </div>
              <p className="mt-4 text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.role} · {t.company}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
