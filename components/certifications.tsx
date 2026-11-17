"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { client, CERTIFICATIONS_QUERY, imageUrl } from "@/lib/sanity";
import { fallbackCertifications } from "@/lib/fallback-data";
import type { Certification } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/ui";

/**
 * Certifications — now showing the real certificate images from Sanity.
 * Each card has its image on top; click to enlarge in a lightbox
 * (Esc / arrows / counter). Missing or malformed image → clean fallback
 * panel, never a broken image.
 */
export function Certifications() {
  const [certs, setCerts] = useState<Certification[]>(fallbackCertifications);
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch(CERTIFICATIONS_QUERY);
        if (alive && Array.isArray(data) && data.length) setCerts(data);
      } catch { /* snapshot stays */ }
    })();
    return () => { alive = false; };
  }, []);

  const close = useCallback(() => setSelected(null), []);
  const step = useCallback((dir: 1 | -1) => setSelected((cur) => (cur === null ? cur : (cur + dir + certs.length) % certs.length)), [certs.length]);

  useEffect(() => {
    if (selected === null) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [selected, close, step]);

  const current = selected !== null ? certs[selected] : null;
  const currentSrc = current ? imageUrl(current.image, 1600) : null;

  return (
    <section id="certifications" className="scroll-mt-24 py-28 sm:py-40" aria-label="Certifications">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Chapter V — Certified" title="Learning, certified." accent="certified." marker="CERTIFIED"
          intro="Four certifications. Click any certificate to view it larger." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {certs.map((c, i) => {
            const src = imageUrl(c.image, 900);
            return (
              <Reveal key={c._id} delay={0.05 * i} className="card-surface group flex flex-col overflow-hidden transition hover:-translate-y-1">
                <button type="button" onClick={() => setSelected(i)} aria-label={`View ${c.title} certificate larger`}
                  className="relative block w-full overflow-hidden bg-stone-100 text-left dark:bg-white/5">
                  {src ? (
                    <Image src={src} alt={`${c.title} — certificate from ${c.issuer}`} width={900} height={640}
                      className="aspect-[4/3] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  ) : (
                    <span className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 p-6 text-center">
                      <Award className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm text-stone-500 dark:text-stone-400">Certificate image not available</span>
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white opacity-0 backdrop-blur transition group-hover:opacity-100">Click to enlarge</span>
                </button>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold leading-snug text-zinc-900 dark:text-white">{c.title}</h3>
                    <span className="shrink-0 text-sm font-medium text-zinc-500 dark:text-zinc-400">{formatDate(c.date)}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-amber-600 dark:text-amber-400">{c.issuer}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{c.description}</p>
                  {c.skills?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">{c.skills.map((s) => <li key={s} className="chip">{s.trim()}</li>)}</ul>
                  ) : null}
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:underline dark:text-amber-400">
                      Verify credential <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {current && selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={close} role="dialog" aria-modal="true" aria-label={`${current.title} — ${selected + 1} of ${certs.length}`}>
            <motion.figure initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white dark:bg-[#1a1712]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-4 py-3 dark:border-white/10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400" aria-live="polite">{selected + 1} / {certs.length}</p>
                <motion.button ref={closeRef} type="button" onClick={close} aria-label="Close certificate viewer" whileHover={{ scale: 1.12, rotate: 90 }} whileTap={{ scale: 0.88 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="grid h-9 w-9 place-items-center rounded-md bg-stone-900 text-white dark:bg-white dark:text-stone-900"><X className="h-4 w-4" /></motion.button>
              </div>
              {currentSrc ? (
                <Image src={currentSrc} alt={`${current.title} — certificate from ${current.issuer}`} width={1600} height={1100} className="max-h-[64vh] w-full object-contain bg-stone-100 dark:bg-black/40" />
              ) : (
                <div className="flex h-64 flex-col items-center justify-center gap-2"><Award className="h-8 w-8 text-amber-600" /><p className="text-sm text-stone-500">Certificate image not available</p></div>
              )}
              <figcaption className="flex flex-wrap items-start justify-between gap-4 p-5">
                <span>
                  <span className="block font-display text-2xl text-stone-900 dark:text-white">{current.title}</span>
                  <span className="mt-1 block text-sm text-stone-500 dark:text-stone-400">{current.issuer} · {formatDate(current.date)}</span>
                </span>
                <span className="flex gap-2">
                  <motion.button type="button" onClick={() => step(-1)} aria-label="Previous certificate" whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="grid h-10 w-10 place-items-center rounded-md border border-stone-200 text-stone-700 transition hover:border-amber-500 hover:text-amber-600 dark:border-white/10 dark:text-stone-200"><ChevronLeft className="h-5 w-5" /></motion.button>
                  <motion.button type="button" onClick={() => step(1)} aria-label="Next certificate" whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="grid h-10 w-10 place-items-center rounded-md border border-stone-200 text-stone-700 transition hover:border-amber-500 hover:text-amber-600 dark:border-white/10 dark:text-stone-200"><ChevronRight className="h-5 w-5" /></motion.button>
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
