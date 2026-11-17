"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { imageUrl } from "@/lib/sanity";
import type { Artwork } from "@/lib/types";
import type { OriginRect } from "@/components/gallery-3d/frame";

const SPRING = { type: "spring" as const, stiffness: 260, damping: 26 };
const WRAP_SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

function label(cat: string) {
  return cat.replace(/-/g, " ");
}

export interface BorderlessViewerProps {
  artworks: Artwork[];
  /** Global index of the open artwork, or null when closed. */
  selected: number | null;
  /** On-screen rect of the frame that was clicked (null when opened from
   *  the flat fallback / HUD — the viewer then fades in centred). */
  originRect: OriginRect | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}

/**
 * Borderless viewer (v7, wrap animation added in v10): the ONLY visible
 * buttons are Previous and Next. No window chrome, no border or frame
 * around the image, no minimise/fullscreen. Close with Esc or by clicking
 * the dark backdrop. Closing never touches scroll position.
 *
 * v10 — Apple-style wrap animation (macOS minimise/restore "genie" feel):
 * when a portrait is clicked, the image starts at the clicked frame's exact
 * on-screen position and size (projected through the camera, passed in as
 * originRect) and warps into the centred full view — the path dips slightly
 * toward the bottom mid-flight, like the genie curve — and on close it
 * wraps back down into the frame. Prev/Next crossfade/slide gently.
 * Without an origin rect (flat fallback, HUD), it falls back to a centred
 * fade/scale spring. Reduced motion always gets a plain fade.
 */
export function BorderlessViewer({ artworks, selected, originRect, onClose, onStep }: BorderlessViewerProps) {
  const reduce = useReducedMotion();
  const lastFocused = useRef<HTMLElement | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const total = artworks.length;
  /** Step direction, for the Prev/Next slide. */
  const [dir, setDir] = useState<1 | -1>(1);
  /** True once the open (wrap) animation has played — it runs once per open. */
  const [wrapped, setWrapped] = useState(false);
  /** True while the exit animation is running (guards the wrap-complete flag). */
  const exitingRef = useRef(false);
  const prevSelectedRef = useRef<number | null>(null);

  // Reset the wrap state only on a fresh open (null → artwork), not on steps.
  useEffect(() => {
    if (selected !== null && prevSelectedRef.current === null) {
      exitingRef.current = false;
      setWrapped(false);
    }
    prevSelectedRef.current = selected;
  }, [selected]);

  const close = useCallback(() => {
    exitingRef.current = true;
    onClose();
  }, [onClose]);
  const step = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      onStep(d);
    },
    [onStep]
  );

  useEffect(() => {
    if (selected === null) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    prevRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus?.();
    };
  }, [selected, close, step]);

  const current = selected !== null ? artworks[selected] : null;
  const currentSrc = current ? imageUrl(current.image, 1600) : null;

  /**
   * Wrap geometry: how far the centred image is from the clicked frame.
   * Target size is estimated from the frame's aspect (target height is
   * 76vh, matching the img's max-h) — the scale animates to 1 at the
   * centre, so a small estimate error is invisible.
   */
  const wrap = useMemo(() => {
    if (!originRect || reduce || typeof window === "undefined") return null;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const targetH = vh * 0.76;
    const targetW = Math.min(vw * 0.94, targetH * (originRect.width / Math.max(originRect.height, 1)));
    if (!targetW || !Number.isFinite(targetW)) return null;
    return {
      scale: originRect.width / targetW,
      dx: originRect.x + originRect.width / 2 - vw / 2,
      dy: originRect.y + originRect.height / 2 - vh / 2,
    };
  }, [originRect, reduce]);

  const useWrap = wrap !== null && !wrapped;

  return (
    <AnimatePresence>
      {current && selected !== null && (
        <motion.div
          key="viewer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduce ? { duration: 0.15 } : { duration: 0.3 }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/90 px-4 py-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} — enlarged artwork`}
        >
          <motion.div
            initial={
              reduce
                ? { opacity: 0 }
                : useWrap
                  ? { opacity: 0, scale: wrap.scale, x: wrap.dx, y: wrap.dy, borderRadius: 6 }
                  : { opacity: 0, scale: 0.92 }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : useWrap
                  ? {
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      // Genie curve: dip slightly toward the bottom mid-flight.
                      y: [wrap.dy, wrap.dy * 0.55 + 48, 0],
                      borderRadius: 0,
                    }
                  : { opacity: 1, scale: 1 }
            }
            exit={
              reduce
                ? { opacity: 0 }
                : wrap
                  ? { opacity: 0, scale: wrap.scale, x: wrap.dx, y: wrap.dy, borderRadius: 6 }
                  : { opacity: 0, scale: 0.92 }
            }
            transition={reduce ? { duration: 0.15 } : useWrap ? WRAP_SPRING : SPRING}
            onAnimationComplete={() => {
              if (!exitingRef.current) setWrapped(true);
            }}
            className="relative max-h-[76vh] max-w-[94vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {currentSrc ? (
                <motion.img
                  key={selected}
                  src={currentSrc}
                  alt={current.title}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -dir * 48 }}
                  transition={reduce ? { duration: 0.15 } : { duration: 0.28, ease: "easeOut" }}
                  className="max-h-[76vh] w-auto max-w-[94vw] object-contain"
                />
              ) : (
                <motion.span
                  key={`missing-${selected}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-64 w-64 items-center justify-center text-sm text-white/70"
                >
                  Image not available
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            key={`caption-${selected}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              {selected + 1} / {total}
            </p>
            <p className="mt-1 text-base font-semibold text-white">
              {current.title}
              {current.year ? <span className="font-normal text-white/60"> · {String(current.year).slice(0, 4)}</span> : ""}
            </p>
            <p className="mt-0.5 text-sm text-white/60">
              {(current.category ?? []).map(label).join(" · ")}
              {current.tools?.length ? ` · ${(current.tools as string[]).map((t) => t.trim()).join(", ")}` : ""}
              {current.client ? ` · ${current.client}` : ""}
            </p>
          </motion.div>

          <motion.button
            ref={prevRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous artwork"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next artwork"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
