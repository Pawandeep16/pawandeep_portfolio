"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ROMAN, type ChapterWall } from "@/lib/chapter-config";
import { Chapter } from "./chapter";
import { IconButton } from "@/components/animated-icon";
import type { OriginRect } from "@/components/gallery-3d/frame";

/**
 * ChapterPager — v14: the six chapters slide HORIZONTALLY like pages.
 *
 * A tall scroll area (600vh) holds one sticky 100svh window; vertical
 * scrolling drives a horizontal translation of the track (0 → -(N-1)×100vw),
 * so scrolling down flips through the chapters left to right. Each chapter
 * is exactly 100vw × 100svh and receives `active` when it is on screen,
 * which fires its marker wipe and word-by-word reveal.
 *
 * Controls: Prev/Next arrow buttons at the sides, chapter dots at the
 * bottom (click → scroll the page to that chapter's position), a counter
 * ("Chapter II / VI · Works 7–12 of 36"), and drag — drag left/right on
 * the window to move between chapters, snapping to the nearest chapter on
 * release. Dragging never opens an artwork: the click that follows a drag
 * is swallowed in the capture phase.
 *
 * The parent (gallery.tsx) owns goToChapter — it scrolls the page to the
 * right offset in this section, which is what the ring's click-to-chapter
 * and the closing carousel use. Reduced motion gets the chapters stacked
 * vertically instead of the pager.
 */

export function ChapterPager({
  walls,
  total,
  onOpen,
  sectionRef,
  goToChapter,
}: {
  walls: ChapterWall[];
  total: number;
  onOpen: (globalIndex: number, rect: OriginRect | null) => void;
  sectionRef: RefObject<HTMLElement>;
  goToChapter: (i: number) => void;
}) {
  const n = walls.length;
  const reduce = useReducedMotion();
  const [vw, setVw] = useState(() => (typeof window === "undefined" ? 1200 : window.innerWidth));
  const [active, setActive] = useState(0);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 140, damping: 30, mass: 0.4 });
  const draggingRef = useRef(false);
  const dragRef = useRef<{ startX: number; startTrackX: number } | null>(null);
  const suppressClickRef = useRef(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sync the track from scroll progress (paused while the visitor drags).
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (draggingRef.current) return;
    x.set(-v * (n - 1) * vw);
    const idx = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    setActive((prev) => (prev === idx ? prev : idx));
  });
  // Keep the track in sync when the viewport width changes.
  useEffect(() => {
    x.set(-scrollYProgress.get() * (n - 1) * vw);
  }, [vw, n, x, scrollYProgress]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = { startX: e.clientX, startTrackX: x.get() };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 8) draggingRef.current = true;
    if (draggingRef.current) {
      x.set(Math.min(0, Math.max(-(n - 1) * vw, d.startTrackX + dx)));
    }
  };
  const onPointerUp = () => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!draggingRef.current || !d) return;
    draggingRef.current = false;
    const idx = Math.min(n - 1, Math.max(0, Math.round(-x.get() / vw)));
    if (Math.abs(x.get() - d.startTrackX) > 8) {
      suppressClickRef.current = true;
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 60);
    }
    goToChapter(idx);
  };
  // Swallow the click that follows a drag, so dragging never opens an artwork.
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const step = useCallback(
    (dir: 1 | -1) => goToChapter(active + dir),
    [active, goToChapter]
  );

  // Reduced motion: chapters stacked vertically, no horizontal pager.
  if (reduce) {
    return (
      <div>
        {walls.map((wall, i) => (
          <Chapter key={wall.id} wall={wall} index={i} active onOpen={onOpen} />
        ))}
      </div>
    );
  }

  const firstShown = walls[active] ? walls[active].startIndex + 1 : 1;
  const lastShown = walls[active] ? walls[active].startIndex + walls[active].items.length : total;

  return (
    <section
      ref={sectionRef}
      aria-label="Gallery chapters — scroll to turn the pages"
      className="relative"
      style={{ height: `${n * 100}vh` }}
    >
      <div
        className="sticky top-0 h-[100svh] select-none overflow-hidden"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClickCapture={onClickCapture}
      >
        <motion.div className="flex h-full" style={{ x: smoothX }}>
          {walls.map((wall, i) => (
            <Chapter key={wall.id} wall={wall} index={i} active={i === active} onOpen={onOpen} />
          ))}
        </motion.div>

        {/* Prev / Next — Lucide chevrons, spring hover/tap */}
        <IconButton
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous chapter"
          disabled={active === 0}
          className="absolute left-3 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full border border-stone-900/15 bg-white/70 text-stone-900 shadow-lg backdrop-blur transition disabled:opacity-30 sm:left-6"
        >
          <ChevronLeft className="h-6 w-6" />
        </IconButton>
        <IconButton
          type="button"
          onClick={() => step(1)}
          aria-label="Next chapter"
          disabled={active === n - 1}
          className="absolute right-3 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full border border-stone-900/15 bg-white/70 text-stone-900 shadow-lg backdrop-blur transition disabled:opacity-30 sm:right-6"
        >
          <ChevronRight className="h-6 w-6" />
        </IconButton>

        {/* Dots + counter */}
        <div className="absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2" role="tablist" aria-label="Chapters">
            {walls.map((wall, i) => (
              <button
                key={wall.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to chapter ${ROMAN[i]} — ${wall.name}`}
                onClick={() => goToChapter(i)}
                className="grid h-7 w-7 place-items-center"
              >
                <motion.span
                  animate={{ scale: i === active ? 1 : 0.7, opacity: i === active ? 1 : 0.55 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="block h-2.5 w-2.5 rounded-full bg-stone-900"
                  style={{ width: i === active ? 26 : 10, borderRadius: 999 }}
                />
              </button>
            ))}
          </div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-700/80">
            Chapter {ROMAN[active]} / {ROMAN[n - 1]} · Works {firstShown}–{lastShown} of {total}
          </p>
        </div>
      </div>
    </section>
  );
}
