"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

/**
 * Pen-draw — the attached artwork, finished live on scroll.
 *
 * One image, three scroll-driven states, all from the same file
 * (public/assets/artwork-forest-saree.webp — a vector illustration by
 * Pawandeep of a woman in a pink polka-dot saree in an autumn forest):
 *   1. Sketch (0–35%): faint pencil outline, only the top revealed.
 *   2. Flat colour (35–70%): colour crossfades in behind a clip reveal
 *      that sweeps left → right, following the pen.
 *   3. Complete (70–100%): full colour, settled scale, "Complete" pill.
 * A pen nib travels an S-curve across the artwork, a dashed bezier trail
 * draws behind it, and anchor points pop in as it passes.
 * Butter-smooth: one spring (stiffness 60, damping 30) drives everything.
 *
 * FIT FIX (v6): the sticky box is exactly 100svh and everything inside it
 * is sized to fit — one compact heading row, one short subline, and the
 * frame capped at 62vh — so the frame never scrolls out of view before the
 * animation finishes. The pen is ONLY the nib image itself
 * (public/assets/pen-nib.svg, 48px, transparent), positioned absolutely
 * inside the frame with its travel clamped to x 4–92% / y 20–88%, and the
 * frame has overflow:hidden, so the pen can never leave the frame.
 * Reduced motion: the finished artwork, statically.
 */

const ANCHORS = [
  { x: 8, y: 82, at: 0.08 },
  { x: 28, y: 38, at: 0.28 },
  { x: 48, y: 62, at: 0.48 },
  { x: 66, y: 28, at: 0.66 },
  { x: 84, y: 52, at: 0.84 },
  { x: 90, y: 20, at: 0.97 },
];

export function PenDraw() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    mass: 0.4,
  });

  // Sketch layer: only the top ~15% revealed at the start, fully in by 35%.
  const sketchClip = useMotionTemplate`inset(0 0 ${useTransform(
    smooth,
    [0, 0.35],
    ["85%", "0%"]
  )} 0)`;
  const sketchOpacity = useTransform(smooth, [0, 0.35, 0.6], [1, 0.9, 0]);
  // Colour layer: clip sweeps left → right between 35% and 70%.
  const colourClip = useMotionTemplate`inset(0 ${useTransform(
    smooth,
    [0.35, 0.7],
    ["100%", "0%"]
  )} 0 0)`;
  const colourSaturate = useTransform(smooth, [0.35, 0.7], [0.6, 1]);
  const colourFilter = useMotionTemplate`saturate(${colourSaturate})`;
  // Settle: gentle scale 1.04 → 1 as the piece completes.
  const scale = useTransform(smooth, [0.7, 1], [1.04, 1]);
  const completeOpacity = useTransform(smooth, [0.92, 1], [0, 1]);

  // Pen travels an S-curve across the artwork, following the reveal.
  // Clamped: x 4%–92%, y 20%–88% — the pen can never leave the frame.
  const penX = useTransform(
    smooth,
    [0, 0.2, 0.45, 0.65, 0.85, 1],
    ["4%", "28%", "48%", "68%", "86%", "92%"]
  );
  const penY = useTransform(
    smooth,
    [0, 0.2, 0.45, 0.65, 0.85, 1],
    ["86%", "42%", "60%", "30%", "50%", "20%"]
  );
  const penRotate = useTransform(smooth, [0, 0.5, 1], [12, -8, 10]);
  // Dashed bezier trail draws behind the pen.
  const trailDraw = useTransform(smooth, [0, 1], [1, 0]);

  useMotionValueEvent(smooth, "change", (v) => {
    setPct(Math.round(v * 100));
  });

  if (reduce) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">07 — Artwork · Drawn live</p>
        <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-none text-stone-900 dark:text-stone-50">
          Watch it <em className="serif-accent text-amber-700 dark:text-amber-500">take shape.</em>
        </h2>
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-stone-200/80 dark:border-white/10">
          <Image
            src="/assets/artwork-forest-saree.webp"
            alt="Finished vector illustration by Pawandeep Thandi — a woman in a pink polka-dot saree sitting on a fallen log in an autumn forest"
            width={1600}
            height={1061}
            className="h-auto w-full"
          />
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          Finished artwork — vector illustration, autumn forest.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative h-[300vh]"
      aria-label="Pen tool finishing a vector illustration as you scroll"
    >
      {/* Exactly one viewport tall, nothing inside it taller than the viewport. */}
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-4 pb-3 pt-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-5xl min-h-0 flex-1 flex-col">
          {/* Compact header: one line for the heading, % inline at the right. */}
          <div className="flex shrink-0 items-baseline justify-between gap-4">
            <p className="eyebrow">07 — Artwork · Drawn live</p>
            <p className="font-mono text-2xl font-bold tabular-nums text-amber-700 dark:text-amber-500" aria-live="polite">
              {pct}%
              <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                {pct < 35 ? "Sketch" : pct < 70 ? "Flat colour" : pct < 100 ? "Finishing" : "Complete"}
              </span>
            </p>
          </div>
          <h2 className="mt-1 shrink-0 whitespace-nowrap font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-none text-stone-900 dark:text-stone-50">
            Watch it{" "}
            <em className="serif-accent text-amber-700 dark:text-amber-500">take shape.</em>
          </h2>
          <p className="mt-2 shrink-0 text-sm leading-snug text-stone-600 dark:text-stone-400">
            Scroll — the pen finishes this piece, stroke by stroke.
          </p>

          {/* The artwork — capped at 62vh so it stays in view until the scroll is done. */}
          <motion.div
            style={{ scale }}
            className="relative mt-3 max-h-[62vh] min-h-0 flex-1 overflow-hidden rounded-2xl border border-stone-200/80 bg-[#faf7f2] shadow-2xl shadow-stone-900/10 dark:border-white/10 dark:bg-white/[0.03]"
          >
            {/* 1 — Sketch: faint pencil outline */}
            <motion.div
              style={{ clipPath: sketchClip, opacity: sketchOpacity }}
              className="absolute inset-0"
              aria-hidden="true"
            >
              <Image
                src="/assets/artwork-forest-saree.webp"
                alt=""
                width={1600}
                height={1061}
                priority
                className="h-full w-full object-cover grayscale contrast-[1.4] brightness-[1.15] opacity-35"
              />
              <svg
                viewBox="0 0 100 66"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <rect
                  x="4"
                  y="4"
                  width="92"
                  height="58"
                  rx="4"
                  fill="none"
                  stroke="#78716c"
                  strokeWidth="0.6"
                  strokeDasharray="3 2"
                  opacity="0.7"
                />
              </svg>
            </motion.div>

            {/* 2/3 — Colour: revealed left → right, then full */}
            <motion.div
              style={{ clipPath: colourClip, filter: colourFilter }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/artwork-forest-saree.webp"
                alt="Vector illustration by Pawandeep Thandi — a woman in a pink polka-dot saree sitting on a fallen log in an autumn forest, being finished by the pen tool"
                width={1600}
                height={1061}
                priority
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Trailing bezier path the pen has drawn */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 z-10 h-full w-full"
              aria-hidden="true"
            >
              <motion.path
                d="M8,82 C25,50 30,35 48,58 C62,75 68,30 82,48 C88,58 90,30 90,20"
                fill="none"
                stroke="#E8590C"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeDasharray="2.5 1.5"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                style={{ strokeDasharray: 1, strokeDashoffset: trailDraw }}
                opacity="0.9"
              />
            </svg>

            {/* Anchor points — pop in as the pen passes them */}
            {ANCHORS.map((a) => {
              const shown = pct / 100 >= a.at;
              return (
                <span
                  key={`${a.x}-${a.y}`}
                  aria-hidden="true"
                  className="absolute z-10 grid h-5 w-5 place-items-center rounded-[4px] border-2 border-stone-900 bg-white transition-all duration-300 dark:border-white"
                  style={{
                    left: `${a.x}%`,
                    top: `${a.y}%`,
                    opacity: shown ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${shown ? 1 : 0.5})`,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                </span>
              );
            })}

            {/* Pen-tool cursor — ONLY the nib image, no card, no wrapper block.
                Positioned absolutely in the frame; translate(-50%, -92%) puts
                the nib tip exactly on the draw point. Travel is clamped to
                x 4–92% / y 20–88% and the frame has overflow:hidden, so the
                pen can never leave the frame. */}
            <motion.img
              src="/assets/pen-nib.svg"
              alt=""
              width={48}
              height={48}
              style={{ left: penX, top: penY, x: "-50%", y: "-92%", rotate: penRotate }}
              className="pointer-events-none absolute z-20 block h-12 w-12"
              aria-hidden="true"
              draggable={false}
            />

            {/* Complete pill */}
            <motion.div
              style={{ opacity: completeOpacity }}
              className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-xl dark:bg-white dark:text-stone-900"
            >
              <Check className="h-4 w-4" /> Complete — vector illustration, autumn forest
            </motion.div>
            <p className="absolute bottom-4 right-4 z-20 hidden font-mono text-[11px] uppercase tracking-[0.2em] text-white/90 drop-shadow sm:block">
              Pawandeep Thandi · Illustrator
            </p>
          </motion.div>

          <p className="mt-2 shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
            Sketch → flat colour → finished · Keep scrolling — the gallery pops up next
          </p>
        </div>
      </div>
    </div>
  );
}
