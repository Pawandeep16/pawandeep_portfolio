"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { imageUrl } from "@/lib/sanity";
import { aspectFromArtwork } from "@/lib/gallery-config";
import { ROMAN, type ChapterWall } from "@/lib/chapter-config";
import { anton } from "@/lib/fonts";

/**
 * CoverRing — the rotating 3D ring of six chapter covers.
 *
 * CSS 3D cylinder (preserve-3d, one cover every 60°): two covers in front
 * (bottom left/right, tilted in perspective), two at the back (top, showing
 * their pale backs). Drag left/right to spin, mouse-wheel / scroll over the
 * ring rotates it in steps, and it auto-advances slowly. Clicking a cover
 * spins it to the front, then calls onSelect.
 *
 * Each cover is a real magazine-cover card: coloured ground per chapter,
 * "PAWANDEEP THANDI" at top centre, the chapter title in Anton, one
 * full-bleed artwork image below the title (the wall's first artwork, real
 * image via imageUrl, kept at its original aspect), and a one-line
 * description at the foot in tiny condensed caps.
 */

const STEP = 60; // degrees between covers
const RADIUS = 340; // cylinder radius (px)

export function CoverRing({
  walls,
  active,
  onActiveChange,
  onSelect,
  compact = false,
}: {
  walls: ChapterWall[];
  active: number;
  onActiveChange: (i: number) => void;
  onSelect: (i: number) => void;
  compact?: boolean;
}) {
  const [rotation, setRotation] = useState(0);
  const [snapping, setSnapping] = useState(true);
  const rotationRef = useRef(0);
  const dragRef = useRef<{ x: number; rot: number } | null>(null);
  const wheelLockRef = useRef(0);
  const autoRef = useRef(true);
  const selectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const norm = useCallback((r: number) => {
    const i = Math.round(-r / STEP) % walls.length;
    return (i + walls.length) % walls.length;
  }, [walls.length]);

  const applyRotation = useCallback(
    (r: number, snap: boolean) => {
      rotationRef.current = r;
      setRotation(r);
      setSnapping(snap);
      const idx = norm(r);
      if (idx !== active) onActiveChange(idx);
    },
    [active, norm, onActiveChange]
  );

  // Slow auto-advance: one step every 5s, paused while dragging / hovering a cover.
  useEffect(() => {
    const t = setInterval(() => {
      if (!autoRef.current || dragRef.current) return;
      applyRotation(rotationRef.current - STEP, true);
    }, 5000);
    return () => clearInterval(t);
  }, [applyRotation]);

  useEffect(
    () => () => {
      if (selectTimerRef.current) clearTimeout(selectTimerRef.current);
    },
    []
  );

  const spinTo = useCallback(
    (i: number) => {
      // Shortest spin that brings cover i to the front (rotation ≡ -i*60).
      const current = rotationRef.current;
      const targetBase = -i * STEP;
      const k = Math.round((current - targetBase) / 360);
      applyRotation(targetBase + k * 360, true);
    },
    [applyRotation]
  );

  const handleSelect = useCallback(
    (i: number) => {
      autoRef.current = false;
      if (norm(rotationRef.current) === i) {
        onSelect(i);
        return;
      }
      spinTo(i);
      if (selectTimerRef.current) clearTimeout(selectTimerRef.current);
      selectTimerRef.current = setTimeout(() => onSelect(i), 850);
    },
    [norm, onSelect, spinTo]
  );

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - wheelLockRef.current < 450) return;
      wheelLockRef.current = now;
      autoRef.current = false;
      const dir = e.deltaY > 0 || e.deltaX > 0 ? -1 : 1;
      applyRotation(rotationRef.current + dir * STEP, true);
    },
    [applyRotation]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, rot: rotationRef.current };
    autoRef.current = false;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    applyRotation(d.rot + (e.clientX - d.x) * 0.35, false);
  };
  const onPointerUp = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    // Snap to the nearest cover.
    applyRotation(Math.round(rotationRef.current / STEP) * STEP, true);
  };

  const coverW = compact ? 170 : 210;
  const coverH = compact ? 255 : 315;

  return (
    <div
      className="relative mx-auto w-full select-none"
      style={{ height: coverH + 90, perspective: 1400, touchAction: "pan-y" }}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      role="listbox"
      aria-label="Gallery chapters"
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
          transition: snapping ? "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
      >
        {walls.map((wall, i) => {
          const cover = wall.items[0];
          const src = cover ? imageUrl(cover.image, 600) : null;
          const aspect = cover ? aspectFromArtwork(cover) : 0.8;
          return (
            <button
              key={wall.id}
              type="button"
              role="option"
              aria-selected={i === active}
              aria-label={`${wall.name} — chapter ${ROMAN[i]}`}
              onClick={() => handleSelect(i)}
              onMouseEnter={() => {
                autoRef.current = false;
              }}
              className="absolute overflow-hidden text-left shadow-[0_24px_60px_-18px_rgba(43,33,24,0.45)]"
              style={{
                width: coverW,
                height: coverH,
                left: -coverW / 2,
                top: -coverH / 2,
                transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)`,
                transformStyle: "preserve-3d",
                backgroundColor: wall.palette.ground,
              }}
            >
              {/* Front face */}
              <span
                className="absolute inset-0 flex flex-col"
                style={{ backfaceVisibility: "hidden", backgroundColor: wall.palette.ground }}
              >
                <span
                  className="pt-3 text-center text-[9px] font-bold uppercase tracking-[0.32em]"
                  style={{ color: wall.palette.accent }}
                >
                  Pawandeep Thandi
                </span>
                <span
                  className={`${anton.className} mt-1 px-2 text-center uppercase leading-[0.95]`}
                  style={{ color: wall.palette.accent, fontSize: 30 }}
                >
                  {wall.keyWord}
                </span>
                <span className="mt-1 px-3 text-center text-[8px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                  Chapter {ROMAN[i]} · {wall.items.length} works
                </span>
                <span className="relative mt-2 flex-1 overflow-hidden">
                  {src && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt={cover?.title ?? wall.name}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ aspectRatio: `${aspect}` }}
                    />
                  )}
                </span>
                <span className="px-3 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-stone-600">
                  {wall.subtitle}
                </span>
              </span>
              {/* Pale back face (seen when the cover is at the back of the ring) */}
              <span
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundColor: "#efe9df",
                }}
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-stone-500">
                  Pawandeep Thandi
                </span>
                <span className={`${anton.className} text-3xl uppercase`} style={{ color: wall.palette.accent }}>
                  {ROMAN[i]}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                  {wall.name}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
