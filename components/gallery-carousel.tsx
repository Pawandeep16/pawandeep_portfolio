"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid, Pause, Play, X } from "lucide-react";
import { imageUrl } from "@/lib/sanity";
import type { Artwork } from "@/lib/types";
import { Reveal } from "@/components/ui";
import type { OriginRect } from "@/components/gallery-3d/frame";

/**
 * The gallery as MDJAmin's "Animated image slider" (CodePen GgpdKPy) —
 * v26/v27, with the research quick wins applied in v28:
 *
 * - Autoplay is OFF by default (v28): the visitor starts it with the
 *   play button. Any interaction — arrow, thumbnail, grid, filter —
 *   stops it permanently until they press play again. The play button
 *   wears a progress ring (the 6s countdown, Pixel Buds pattern); the
 *   ring IS the timer — when its animation ends, the slide advances,
 *   so pausing on hover/focus freezes ring and slide together.
 * - Arrows are 48x48 (v28, was 40x35) — the research minimum.
 * - Category filter chips (v28) with counts, plus Featured (the 5
 *   artworks flagged featured in the data) — a second way into the
 *   work, so a visitor hunting portraits never scrolls past print.
 * - "View all" grid (v28): every work in the current filter as a
 *   grid; clicking one jumps the slider to it. The fullscreen viewer
 *   follows the same filtered list (reported up via onVisibleChange).
 * - Counter aria-live is "off" while auto-advancing, "polite" when
 *   paused (v28, APG guidance).
 * - Featured artworks wear a small "Featured" pill in the caption.
 *
 * Kept from v26/v27: one rounded card, the active artwork filling it
 * over a blurred copy of itself, edges feathered into the backdrop,
 * the next two artworks as thumbnails peeking out on the right
 * (second spilling ~20px past the edge), prev/next squares at the
 * bottom, slides gliding into slots over 0.5s, title/description/
 * "See More" rising while un-blurring (staggered 0/0.3/0.6s).
 * Next.js is 13.5.1 here, so the research's `priority` deprecation
 * (Next.js 16) does not apply — `priority` stays as it is.
 */

const AUTO_ADVANCE_MS = 6000;
const SLOT_MS = 500;
const RING_C = 2 * Math.PI * 17; // progress-ring circumference, r = 17

const CATEGORY_LABELS: Record<string, string> = {
  "digital-art": "Digital art",
  illustration: "Illustration",
  "print-design": "Print design",
  photography: "Photography",
  branding: "Branding",
  "ui-ux": "UI / UX",
  "web-design": "Web design",
};

const FILTER_DEFS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "featured", label: "Featured" },
  { key: "digital-art", label: "Digital art" },
  { key: "illustration", label: "Illustration" },
  { key: "print-design", label: "Print design" },
  { key: "photography", label: "Photography" },
  { key: "ui-ux", label: "UI / UX" },
  { key: "branding", label: "Branding" },
  { key: "web-design", label: "Web design" },
];

function metaLine(a: Artwork): string {
  const cats = (a.category ?? []).map((c) => CATEGORY_LABELS[c] ?? c.replace(/-/g, " "));
  const tools = (a.tools ?? []).map((t) => String(t).trim()).filter(Boolean);
  return [...cats, a.year, ...tools].filter(Boolean).join(" · ");
}

/** Slot geometry — mirrors the pen's nth-child rules. */
type SlotStyle = {
  left: string;
  top: string;
  width: string;
  height: string;
  transform: string;
  opacity: number;
  zIndex: number;
};

function slotStyle(slot: number): SlotStyle {
  if (slot === 0) {
    // Previous slide: fills the card underneath the active one.
    return { left: "0", top: "0", width: "100%", height: "100%", transform: "translate(0, 0)", opacity: 1, zIndex: 0 };
  }
  if (slot === 1) {
    // Active slide: fills the card, on top, content visible.
    return { left: "0", top: "0", width: "100%", height: "100%", transform: "translate(0, 0)", opacity: 1, zIndex: 10 };
  }
  if (slot === 2) {
    // First peek thumbnail (pen: left 50% — here anchored to the right).
    return { left: "calc(100% - 420px)", top: "50%", width: "200px", height: "250px", transform: "translate(0, -50%)", opacity: 1, zIndex: 20 };
  }
  if (slot === 3) {
    // Second thumbnail, spilling 20px past the card's right edge.
    return { left: "calc(100% - 180px)", top: "50%", width: "200px", height: "250px", transform: "translate(0, -50%)", opacity: 1, zIndex: 20 };
  }
  // Everything further back: parked off the right edge, invisible.
  return { left: "calc(100% + 40px)", top: "50%", width: "200px", height: "250px", transform: "translate(0, -50%)", opacity: 0, zIndex: 0 };
}

/** Feather mask for the main image: fully opaque in the middle, fading
 * to transparent at the edges, so the artwork melts into its blurred
 * backdrop instead of ending in a hard rectangle. A plain `fill` image
 * can't be masked this way (its box is the whole frame, not the image),
 * so the feathered image is sized by its own aspect ratio instead. */
const FEATHER_MASK = "radial-gradient(ellipse at 50% 50%, #000 68%, transparent 99%)";

/** One slide: the blended backdrop + the whole image, like the pen's .item. */
function SlideImage({ artwork, priority, sizes, feather }: { artwork: Artwork; priority?: boolean; sizes: string; feather?: boolean }) {
  const sharp = imageUrl(artwork.image, 1600);
  const soft = imageUrl(artwork.image, 400);
  return (
    <>
      {/* Blurred backdrop — the same artwork, enlarged, filling the frame
          so any aspect ratio blends into matching colour. */}
      {soft && (
        <Image
          src={soft}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="scale-125 object-cover blur-3xl brightness-[0.8] saturate-150"
        />
      )}
      {/* The artwork itself, shown whole. */}
      {sharp &&
        (feather ? (
          <Image
            src={sharp}
            alt={artwork.title}
            width={artwork.imageWidth ?? 1600}
            height={artwork.imageHeight ?? 1200}
            priority={priority}
            draggable={false}
            className="h-auto max-h-full w-auto max-w-full"
            style={{ maskImage: FEATHER_MASK, WebkitMaskImage: FEATHER_MASK }}
          />
        ) : (
          <Image
            src={sharp}
            alt={artwork.title}
            fill
            sizes={sizes}
            priority={priority}
            draggable={false}
            className="object-contain drop-shadow-2xl"
          />
        ))}
    </>
  );
}

export function GalleryCarousel({
  artworks,
  onOpen,
  onVisibleChange,
}: {
  artworks: Artwork[];
  /** Index into the currently visible (filtered) list. */
  onOpen: (visibleIndex: number, rect: OriginRect | null) => void;
  /** The filtered list, so the fullscreen viewer follows the filter. */
  onVisibleChange: (list: Artwork[]) => void;
}) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>("all");
  const [gridOpen, setGridOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const [playEpoch, setPlayEpoch] = useState(0);

  const filtered = useMemo(() => {
    if (filter === "all") return artworks;
    if (filter === "featured") return artworks.filter((a) => a.featured);
    return artworks.filter((a) => (a.category ?? []).includes(filter));
  }, [artworks, filter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: artworks.length, featured: artworks.filter((a) => a.featured).length };
    for (const d of FILTER_DEFS) {
      if (d.key !== "all" && d.key !== "featured") {
        c[d.key] = artworks.filter((a) => (a.category ?? []).includes(d.key)).length;
      }
    }
    return c;
  }, [artworks]);

  // The pen's order: the 2nd item is active. Start rotated so the first
  // artwork is the active one ([last, 0, 1, 2, ...]).
  const resetOrder = useCallback((n: number) => {
    setOrder(n ? [n - 1, ...Array.from({ length: n - 1 }, (_, i) => i)] : []);
  }, []);
  const [order, setOrder] = useState<number[]>(() =>
    filtered.length ? [filtered.length - 1, ...Array.from({ length: filtered.length - 1 }, (_, i) => i)] : []
  );

  // Restart the order whenever the filtered set changes (filter or data).
  useEffect(() => {
    resetOrder(filtered.length);
  }, [filtered.length, filter, resetOrder]);

  // Keep the viewer on the same filtered list as the slider.
  useEffect(() => {
    onVisibleChange(filtered);
  }, [filtered, onVisibleChange]);

  // Grid dialog: focus the close button, Esc closes, lock body scroll,
  // return focus to the "View all" button on close.
  const gridCloseRef = useRef<HTMLButtonElement>(null);
  const viewAllBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!gridOpen) return;
    gridCloseRef.current?.focus();
    const trigger = viewAllBtnRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGridOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [gridOpen]);

  const stopAutoplay = useCallback(() => setPlaying(false), []);

  // Pure rotation (the pen's appendChild / prepend).
  const rotateNext = useCallback(() => {
    setOrder((o) => (o.length > 1 ? [...o.slice(1), o[0]] : o));
  }, []);
  const rotatePrev = useCallback(() => {
    setOrder((o) => (o.length > 1 ? [o[o.length - 1], ...o.slice(0, -1)] : o));
  }, []);

  // User navigation always stops autoplay permanently (until Play again).
  const next = useCallback(() => {
    stopAutoplay();
    rotateNext();
  }, [stopAutoplay, rotateNext]);
  const prev = useCallback(() => {
    stopAutoplay();
    rotatePrev();
  }, [stopAutoplay, rotatePrev]);
  // Jump so the thumbnail currently in `slot` becomes the active slide.
  const goToSlot = useCallback(
    (slot: number) => {
      if (slot <= 1) return;
      stopAutoplay();
      setOrder((o) => {
        const by = slot - 1;
        return [...o.slice(by), ...o.slice(0, by)];
      });
    },
    [stopAutoplay]
  );
  // Jump the slider to a specific artwork in the filtered list.
  const goToArtwork = useCallback(
    (visibleIdx: number) => {
      stopAutoplay();
      setOrder((o) => {
        const n = o.length;
        if (!n) return o;
        const pos = o.indexOf(visibleIdx);
        if (pos < 0 || pos === 1) return o;
        const by = (((pos - 1) % n) + n) % n;
        return [...o.slice(by), ...o.slice(0, by)];
      });
    },
    [stopAutoplay]
  );

  const changeFilter = useCallback(
    (key: string) => {
      stopAutoplay();
      setFilter(key);
    },
    [stopAutoplay]
  );

  const togglePlay = useCallback(() => {
    if (reduce) return;
    setPlaying((v) => {
      if (!v) setPlayEpoch((e) => e + 1);
      return !v;
    });
  }, [reduce]);

  // The progress ring IS the autoplay timer: when its animation ends,
  // advance — unless the user paused it in the meantime (the animation
  // is frozen while hovered/focused, so it can't end while paused).
  const advancingRef = useRef(false);
  advancingRef.current = playing && !autoPaused;
  const onRingEnd = useCallback(() => {
    if (advancingRef.current) rotateNext();
  }, [rotateNext]);

  const activeVisibleIdx = order.length > 1 ? order[1] : order[0] ?? 0;
  const active = filtered[activeVisibleIdx];
  const advancing = playing && !autoPaused;
  const cardRef = useRef<HTMLDivElement>(null);

  const openActive = useCallback(() => {
    const rect = cardRef.current?.getBoundingClientRect() ?? null;
    onOpen(activeVisibleIdx, rect ? { x: rect.left, y: rect.top, width: rect.width, height: rect.height } : null);
  }, [activeVisibleIdx, onOpen]);

  const slotTransition = reduce
    ? "none"
    : `left ${SLOT_MS}ms ease, top ${SLOT_MS}ms ease, width ${SLOT_MS}ms ease, height ${SLOT_MS}ms ease, opacity ${SLOT_MS}ms ease, transform ${SLOT_MS}ms ease`;

  const filterLabel = FILTER_DEFS.find((d) => d.key === filter)?.label ?? "All";

  return (
    <section id="gallery" className="scroll-mt-24 overflow-x-clip py-28 sm:py-40" aria-label="Design gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">The Gallery</p>
              <h2 className="mt-3 font-display text-4xl leading-none text-stone-900 dark:text-stone-50 sm:text-5xl">
                Selected works.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400"
                aria-live={advancing ? "off" : "polite"}
              >
                {filtered.length ? `${activeVisibleIdx + 1} / ${filtered.length}` : "No works yet"}
              </p>
              {/* Play/pause with the 6s progress ring around it. */}
              <div className="relative grid h-10 w-10 place-items-center">
                <svg className="absolute inset-0 h-10 w-10 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
                  <circle cx="20" cy="20" r="17" fill="none" strokeWidth="2.5" className="stroke-stone-300 dark:stroke-white/15" />
                  {playing && (
                    <circle
                      key={`${activeVisibleIdx}-${playEpoch}`}
                      cx="20"
                      cy="20"
                      r="17"
                      fill="none"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="stroke-amber-600"
                      strokeDasharray={RING_C}
                      strokeDashoffset={RING_C}
                      style={{
                        animation: `gallery-ring ${AUTO_ADVANCE_MS}ms linear forwards`,
                        animationPlayState: advancing ? "running" : "paused",
                      }}
                      onAnimationEnd={onRingEnd}
                    />
                  )}
                </svg>
                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={reduce ?? false}
                  aria-label={playing ? "Stop automatic slide advance" : "Start automatic slide advance"}
                  aria-pressed={playing}
                  title={reduce ? "Animations are reduced on this device" : undefined}
                  className="relative grid h-8 w-8 place-items-center rounded-full border border-stone-300 bg-white text-stone-700 transition hover:border-amber-500 hover:text-amber-600 disabled:opacity-50 dark:border-white/15 dark:bg-zinc-900 dark:text-stone-300 dark:hover:text-amber-400"
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>
              <button
                type="button"
                ref={viewAllBtnRef}
                onClick={() => setGridOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-amber-500 hover:text-amber-600 dark:border-white/15 dark:text-stone-300 dark:hover:text-amber-400"
              >
                <LayoutGrid className="h-4 w-4" /> View all
              </button>
            </div>
          </div>
        </Reveal>

        {/* Category filters — a second way into the work. */}
        <Reveal delay={0.05} className="mt-8">
          <div
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter artworks by category"
          >
            {FILTER_DEFS.filter((d) => (counts[d.key] ?? 0) > 0).map((d) => {
              const isActive = filter === d.key;
              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => changeFilter(d.key)}
                  aria-pressed={isActive}
                  className={
                    isActive
                      ? "shrink-0 rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition dark:bg-white dark:text-stone-900"
                      : "shrink-0 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 transition hover:border-amber-500 hover:text-amber-600 dark:border-white/15 dark:text-stone-300 dark:hover:text-amber-400"
                  }
                >
                  {d.label} <span className={isActive ? "text-white/60 dark:text-stone-500" : "text-stone-400 dark:text-stone-500"}>{counts[d.key]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {filtered.length > 0 && (
          <Reveal delay={0.08} className="mt-8">
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Gallery — use the left and right arrow keys to change slides"
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") prev();
                if (e.key === "ArrowRight") next();
              }}
              onMouseEnter={() => setAutoPaused(true)}
              onMouseLeave={() => setAutoPaused(false)}
              onFocus={() => setAutoPaused(true)}
              onBlur={() => setAutoPaused(false)}
            >
              {/* The pen's .container — the card the slider lives in. */}
              <div
                ref={cardRef}
                className="relative mx-auto h-[480px] w-full max-w-4xl rounded-[20px] bg-stone-100 shadow-[0_30px_50px_rgba(0,0,0,0.18)] dark:bg-zinc-900 sm:h-[520px] lg:h-[560px]"
              >
                <div className="absolute inset-0">
                  {order.map((visIdx, slot) => {
                    const a = filtered[visIdx];
                    if (!a) return null;
                    const s = slotStyle(slot);
                    const isActive = slot === 1;
                    const isThumb = slot === 2 || slot === 3;
                    return (
                      <div
                        key={a._id}
                        aria-hidden={!isActive}
                        style={{
                          left: s.left,
                          top: s.top,
                          width: s.width,
                          height: s.height,
                          transform: s.transform,
                          opacity: s.opacity,
                          zIndex: s.zIndex,
                          transition: slotTransition,
                        }}
                        className={
                          isThumb
                            ? "absolute hidden overflow-hidden rounded-[20px] shadow-[0_30px_50px_rgba(0,0,0,0.35)] lg:block"
                            : "absolute overflow-hidden rounded-[20px]"
                        }
                      >
                        {slot <= 5 ? (
                          <button
                            type="button"
                            onClick={() => {
                              if (isActive) openActive();
                              else if (isThumb) goToSlot(slot);
                            }}
                            aria-label={isActive ? `${a.title} — open fullscreen` : `Go to ${a.title}`}
                            tabIndex={isActive || isThumb ? 0 : -1}
                            className="relative flex h-full w-full cursor-pointer items-center justify-center"
                          >
                            <SlideImage
                              artwork={a}
                              priority={isActive}
                              sizes={isThumb ? "200px" : "(max-width: 768px) 100vw, 896px"}
                              feather={isActive}
                            />
                          </button>
                        ) : null}

                        {/* Legibility gradient over the active photo, left side. */}
                        {isActive && (
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent"
                          />
                        )}

                        {/* The pen's .content — only on the active slide. */}
                        {isActive && (
                          <div className="pointer-events-none absolute left-6 top-1/2 w-[min(300px,calc(100%-3rem))] -translate-y-1/2 text-left text-white lg:left-[100px]">
                            <motion.h3
                              key={`name-${a._id}`}
                              initial={reduce ? false : { opacity: 0, y: 100, filter: "blur(33px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
                              className="font-display text-4xl uppercase leading-none sm:text-5xl"
                            >
                              {a.title}
                            </motion.h3>
                            {a.description ? (
                              <motion.p
                                key={`des-${a._id}`}
                                initial={reduce ? false : { opacity: 0, y: 100, filter: "blur(33px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                                className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base"
                              >
                                {a.description}
                              </motion.p>
                            ) : null}
                            <motion.div
                              key={`meta-${a._id}`}
                              initial={reduce ? false : { opacity: 0, y: 100, filter: "blur(33px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
                            >
                              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                                {a.featured && (
                                  <span className="mr-2 rounded-full bg-amber-500 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide text-white">
                                    Featured
                                  </span>
                                )}
                                {metaLine(a)}
                              </p>
                              <button
                                type="button"
                                onClick={openActive}
                                className="pointer-events-auto mt-5 cursor-pointer rounded-[10px] bg-white/70 px-5 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-white"
                              >
                                See More
                              </button>
                            </motion.div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* The pen's .button — two translucent squares, bottom centre, now 48px. */}
                <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-5">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous artwork"
                    className="grid h-12 w-12 place-items-center rounded-lg border-2 border-black/30 bg-white/60 text-stone-900 backdrop-blur transition hover:scale-110 hover:border-white/80 hover:bg-white focus:scale-110 focus:bg-white active:scale-[1.02]"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next artwork"
                    className="grid h-12 w-12 place-items-center rounded-lg border-2 border-black/30 bg-white/60 text-stone-900 backdrop-blur transition hover:scale-110 hover:border-white/80 hover:bg-white focus:scale-110 focus:bg-white active:scale-[1.02]"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {filtered.length === 0 && (
          <p className="mt-8 text-stone-500 dark:text-stone-400">No works in this category yet.</p>
        )}
      </div>

      {/* "View all" grid — every work in the current filter. */}
      {gridOpen && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-stone-950/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${filterLabel} — all artworks`}
          onClick={() => setGridOpen(false)}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-xl text-white sm:text-2xl">
              {filterLabel} <span className="font-mono text-sm text-white/60">— {filtered.length} works</span>
            </p>
            <button
              type="button"
              ref={gridCloseRef}
              onClick={() => setGridOpen(false)}
              aria-label="Close gallery grid"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-8" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((a, i) => {
                const thumb = imageUrl(a.image, 400);
                const isCurrent = i === activeVisibleIdx;
                return (
                  <button
                    key={a._id}
                    type="button"
                    onClick={() => {
                      goToArtwork(i);
                      setGridOpen(false);
                    }}
                    aria-current={isCurrent}
                    aria-label={`${a.title}${isCurrent ? " — currently showing" : ""}`}
                    className="group text-left"
                  >
                    <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-zinc-800">
                      {thumb && (
                        <Image
                          src={thumb}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                      )}
                      {isCurrent && (
                        <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          Now showing
                        </span>
                      )}
                    </span>
                    <span className="mt-2 block truncate text-sm font-medium text-white">{a.title}</span>
                    <span className="block truncate text-xs text-white/60">{metaLine(a)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
