"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { client, TESTIMONIALS_QUERY } from "@/lib/sanity";
import { fallbackTestimonials } from "@/lib/fallback-data";
import type { Testimonial } from "@/lib/types";
import { Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Testimonials as a drag-enabled carousel (Embla, already a dependency):
 * one large quote per slide, swipe/drag on touch, arrows + dots, gentle
 * auto-advance that pauses on hover, focus or touch — and never runs when
 * the visitor prefers reduced motion. Falls back to the static snapshot
 * when Sanity is unreachable, like every other section.
 */
export function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(fallbackTestimonials);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

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

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-advance every 6s unless paused or reduced motion is preferred.
  useEffect(() => {
    if (!emblaApi || reduce || paused || items.length < 2) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), 6000);
    return () => window.clearInterval(id);
  }, [emblaApi, reduce, paused, items.length]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const goTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  return (
    <section id="testimonials" className="scroll-mt-24 py-28 sm:py-40" aria-label="Testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Chapter VI — Kind words" title="What people say." accent="say." marker="VOICES"
          intro="What people I've worked with say." />

        <Reveal className="mt-12">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") prev();
              if (e.key === "ArrowRight") next();
            }}
            className="relative"
          >
            <div ref={emblaRef} className="overflow-hidden rounded-[2rem]">
              <div className="flex">
                {items.map((t, i) => (
                  <article
                    key={t._id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${items.length}`}
                    className="card-surface min-w-0 shrink-0 grow-0 basis-full p-8 sm:p-12 md:grid md:grid-cols-[1fr_240px] md:gap-10"
                  >
                    <div className="min-w-0">
                      <Quote className="h-8 w-8 text-amber-600/60 dark:text-amber-400/60" aria-hidden="true" />
                      <p className="mt-6 text-xl leading-relaxed text-zinc-800 dark:text-zinc-200 sm:text-2xl">
                        &ldquo;{t.content.replace(/^"|"$/g, "")}&rdquo;
                      </p>
                      <div className="mt-8 flex items-center gap-1" aria-label={`Rated ${t.rating} out of 5`}>
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className={s < t.rating ? "h-4 w-4 fill-amber-400 text-amber-400" : "h-4 w-4 text-zinc-300 dark:text-zinc-600"} aria-hidden="true" />
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 border-t border-stone-200 pt-6 dark:border-white/10 md:mt-0 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                      <p className="text-lg font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{t.role} · {t.company}</p>
                      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Testimonial {i + 1} of {items.length}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {items.length > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300 text-zinc-700 transition hover:border-amber-500 hover:text-amber-600 dark:border-white/15 dark:text-zinc-300 dark:hover:text-amber-400"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
                  {items.map((t, i) => (
                    <button
                      key={t._id}
                      type="button"
                      role="tab"
                      aria-selected={i === selected}
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => goTo(i)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        i === selected ? "w-8 bg-amber-600" : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600",
                      )}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300 text-zinc-700 transition hover:border-amber-500 hover:text-amber-600 dark:border-white/15 dark:text-zinc-300 dark:hover:text-amber-400"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
