"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CHAPTER_ACCENT, CHAPTER_PAPER, darkPalette, ROMAN, type ChapterWall } from "@/lib/chapter-config";
import { anton } from "@/lib/fonts";
import { CoverRing } from "./ring";

/**
 * Stage — the 100vh opening stage: cream paper with grain, header row,
 * tall-condensed headline, laurel badges, and the rotating 3D ring of six
 * chapter covers below. Colours cross-fade to the active chapter's accent.
 */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/** One headline segment; `small` renders at ~half size, raised like a superscript. */
function Seg({ text, small = false }: { text: string; small?: boolean }) {
  return (
    <span
      className="inline-block"
      style={small ? { fontSize: "0.48em", verticalAlign: "super", margin: "0 0.08em" } : undefined}
    >
      {text}
    </span>
  );
}

/** Simple laurel wreath drawn with inline SVG — two arcs of leaves. */
function Laurel({ label, accent }: { label: string; accent: string }) {
  const leaves = [];
  for (let k = 0; k < 8; k++) {
    const t = k / 7; // 0 = bottom, 1 = top
    for (const side of [-1, 1] as const) {
      const ang = Math.PI * (0.5 + t * 0.42); // sweep up each side
      const x = 60 + side * Math.cos(ang) * 46;
      const y = 62 - Math.sin(ang) * 46;
      const rot = side * (20 + t * 55);
      leaves.push(
        <ellipse
          key={`${side}-${k}`}
          cx={x}
          cy={y}
          rx={7.5}
          ry={3}
          fill={accent}
          transform={`rotate(${rot} ${x} ${y})`}
        />
      );
    }
  }
  return (
    <span className="relative inline-grid place-items-center" style={{ width: 120, height: 120 }}>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {leaves}
        <path d="M60 108 L60 116" stroke={accent} strokeWidth="1.5" />
      </svg>
      <span className="max-w-[86px] text-center text-[10px] font-bold uppercase leading-tight tracking-[0.18em] text-stone-700 dark:text-stone-300">
        {label}
      </span>
    </span>
  );
}

export function Stage({
  walls,
  total,
  onSelectChapter,
}: {
  walls: ChapterWall[];
  total: number;
  onSelectChapter: (i: number) => void;
}) {
  const [active, setActive] = useState(0);
  const { resolvedTheme } = useTheme();
  const base = walls[active]?.palette;
  const palette = resolvedTheme === "dark" && base ? darkPalette(base) : base;
  const accent = palette?.accent ?? CHAPTER_ACCENT;
  const ground = palette?.ground ?? (resolvedTheme === "dark" ? "#0c0c0d" : CHAPTER_PAPER);

  return (
    <div
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{ backgroundColor: ground, transition: "background-color 1s ease" }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: GRAIN }}
        aria-hidden="true"
      />

      {/* Header row */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-start justify-between px-4 pt-6 sm:px-6 lg:px-8">
        <a
          href="#about"
          className="hidden pt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-600 underline-offset-4 transition hover:text-stone-900 hover:underline dark:text-stone-300 dark:hover:text-white sm:block"
        >
          About
        </a>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-stone-900 dark:text-stone-50 sm:text-sm">Pawandeep Thandi</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-stone-500 dark:text-stone-400">
            The Gallery
          </p>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-stone-400/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-700 transition hover:border-stone-900 hover:text-stone-900 dark:border-white/25 dark:text-stone-200 dark:hover:border-white dark:hover:text-white sm:px-4"
        >
          Resume <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </header>

      {/* Headline block */}
      <div className="relative z-10 mx-auto max-w-[800px] px-4 pt-[clamp(3rem,9vh,6.5rem)] text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-xl leading-none"
          style={{ color: accent }}
          aria-hidden="true"
        >
          ✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`${anton.className} mt-4 uppercase leading-[0.98] text-stone-900 dark:text-stone-50`}
          style={{ fontSize: "clamp(3rem, 8vw, 4.6rem)" }}
        >
          <span className="block">
            <Seg text="Step" /> <Seg text="Inside" />
          </span>
          <span className="block">
            <Seg text="the" small /> <Seg text="Gallery" />
          </span>
          <span className="block">
            <Seg text="of" small /> <Seg text="My" />
          </span>
          <span className="block" style={{ color: accent }}>
            <Seg text="Work" />
          </span>
        </motion.h2>

        {/* Laurel badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 flex items-start justify-center gap-6 sm:gap-10"
        >
          <Laurel label={`${total} Works`} accent={accent} />
          <Laurel label="Digital Art · 2026" accent={accent} />
        </motion.div>
      </div>

      {/* Rotating ring of chapter covers — lower two-thirds */}
      <div className="relative z-10 mt-auto">
        <CoverRing walls={walls} active={active} onActiveChange={setActive} onSelect={onSelectChapter} />
        <p className="pb-16 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
          Chapter {ROMAN[active]} — {walls[active]?.name ?? ""}
        </p>
      </div>

      {/* Bottom chrome */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-4 pb-4 sm:px-6 lg:px-8">
        <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
          Made by <span className="font-bold text-stone-700 dark:text-stone-200">Pawandeep</span>
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
          Drag or use the arrows <ArrowRight className="inline h-3 w-3" aria-hidden="true" /> · {total} works
        </p>
      </div>
    </div>
  );
}
