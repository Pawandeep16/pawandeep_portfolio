"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ROMAN, type ChapterWall } from "@/lib/chapter-config";
import { Chapter } from "./chapter";
import { IconButton } from "@/components/animated-icon";
import type { OriginRect } from "@/components/gallery-3d/frame";

/**
 * ChapterPager — the six chapters as a true horizontal carousel.
 * v23: the scroll-driven 600vh pager is gone — the page scrolls normally
 * and the chapters turn with the arrows, dots, drag, swipe or arrow keys.
 * Auto-advance every 7s pauses on hover, focus, touch or drag, and never
 * runs under reduced motion. The current chapter lives in the parent
 * (Gallery) so the ring and closing can jump to a chapter. Controls:
 * side arrows, chapter dots, a counter, a progress bar, a pause/play
 * toggle and drag — dragging never opens an artwork (the click that
 * follows a drag is swallowed in the capture phase). Reduced motion gets
 * the chapters stacked vertically instead of the carousel.
 */

const AUTO_ADVANCE_MS = 7000;

export function ChapterPager({
  walls,
  total,
  onOpen,
  sectionRef,
  active,
  onActiveChange,
}: {
  walls: ChapterWall[];
  total: number;
  onOpen: (globalIndex: number, rect: OriginRect | null) => void;
  sectionRef: RefObject<HTMLElement>;
  active: number;
  onActiveChange: (i: number) => void;
}) {
  const n = walls.length;
  const reduce = useReducedMotion();
  const [vw, setVw] = useState(() => (typeof window === "undefined" ? 1200 : window.innerWidth));
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 140, damping: 30, mass: 0.4 });
  const draggingRef = useRef(false);
  const dragRef = useRef<{ startX: number; startTrackX: number } | null>(null);
  const suppressClickRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused || autoPaused;

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Keep the track in sync with the active chapter / viewport.
  useEffect(() => {
    x.set(-active * vw);
  }, [vw, n, x, active]);

  // Gentle auto-advance — off under reduced motion, paused on hover,
  // focus, touch or drag, and off entirely when the visitor pauses it.
  useEffect(() => {
    if (reduce || n < 2) return;
    const id = window.setInterval(() => {
      if (pausedRef.current || draggingRef.current) return;
      onActiveChange((active + 1) % n);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [reduce, n, active, onActiveChange]);

  const go = useCallback(
    (i: number) => {
      const idx = Math.min(n - 1, Math.max(0, i));
      onActiveChange(idx);
    },
    [n, onActiveChange]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    setAutoPaused(true);
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
    go(idx);
  };
  // Swallow the click that follows a drag, so dragging never opens an artwork.
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const step = useCallback((dir: 1 | -1) => go((active + dir + n) % n), [active, go, n]);

  // Keyboard: focus the carousel window and turn chapters with the arrow keys.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };

  // Reduced motion: chapters stacked vertically, no carousel.
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
    <section ref={sectionRef} id="gallery-chapters" aria-label="Gallery chapters" className="relative scroll-mt-20">
      {/* Carousel heading */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <p className="eyebrow">The Gallery — Selected works</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl leading-none text-stone-900 dark:text-stone-50 sm:text-5xl">
            Drag, swipe, or turn the page.
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
            Chapter {ROMAN[active]} / {ROMAN[n - 1]} · Works {firstShown}–{lastShown} of {total}
          </p>
        </div>
      </div>

      <div
        className="relative h-[100svh] select-none overflow-hidden"
        style={{ touchAction: "pan-y" }}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Gallery chapters — use the left and right arrow keys to turn pages"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        onMouseEnter={() => setAutoPaused(true)}
        onMouseLeave={() => setAutoPaused(false)}
        onFocus={() => setAutoPaused(true)}
        onBlur={() => setAutoPaused(false)}
      >
        {/* Progress bar — how far through the chapters */}
        <div className="absolute inset-x-0 top-0 z-20 h-[3px] bg-stone-900/10" aria-hidden="true">
          <motion.div
            className="h-full bg-stone-900"
            animate={{ width: `${((active + 1) / n) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

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
          className="absolute left-2 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full border border-stone-900/15 bg-white/70 text-stone-900 shadow-lg backdrop-blur transition hover:bg-white sm:left-6"
        >
          <ChevronLeft className="h-6 w-6" />
        </IconButton>
        <IconButton
          type="button"
          onClick={() => step(1)}
          aria-label="Next chapter"
          className="absolute right-2 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full border border-stone-900/15 bg-white/70 text-stone-900 shadow-lg backdrop-blur transition hover:bg-white sm:right-6"
        >
          <ChevronRight className="h-6 w-6" />
        </IconButton>

        {/* Dots + counter + pause */}
        <div className="absolute inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1 sm:gap-2" role="tablist" aria-label="Chapters">
            {walls.map((wall, i) => (
              <button
                key={wall.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to chapter ${ROMAN[i]} — ${wall.name}`}
                onClick={() => go(i)}
                className="grid h-11 w-11 place-items-center md:h-7 md:w-7"
              >
                <motion.span
                  animate={{ scale: i === active ? 1 : 0.7, opacity: i === active ? 1 : 0.55 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="block h-2.5 w-2.5 rounded-full bg-stone-900"
                  style={{ width: i === active ? 26 : 10, borderRadius: 999 }}
                />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              aria-label={paused ? "Resume automatic chapter advance" : "Pause automatic chapter advance"}
              aria-pressed={paused}
              className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-stone-900/15 bg-white/70 text-stone-900 shadow backdrop-blur transition hover:bg-white"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          </div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-700/80">
            Chapter {ROMAN[active]} / {ROMAN[n - 1]} · Works {firstShown}–{lastShown} of {total}
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500/80 md:block">
            <kbd className="rounded border border-stone-400/50 px-1 py-0.5">←</kbd> <kbd className="rounded border border-stone-400/50 px-1 py-0.5">→</kbd> to turn pages
          </p>
        </div>
      </div>
    </section>
  );
}
