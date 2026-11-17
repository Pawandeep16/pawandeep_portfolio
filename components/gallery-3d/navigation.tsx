"use client";

import { ChevronDown, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryWallData } from "@/components/gallery-wall";

export interface GalleryHUDProps {
  walls: GalleryWallData[];
  activeWall: number;
  /** Scroll progress 0–100. */
  pct: number;
  shownCount: number;
  total: number;
  /** True once the visitor has started scrolling. */
  started: boolean;
  /** True once the visitor has opened any portrait. */
  hasOpened: boolean;
  onDot: (index: number) => void;
  onExit: () => void;
}

/**
 * HUD overlay for the 3D gallery — HTML, outside the Canvas.
 * The root container is pointer-events-none; ONLY real buttons get
 * pointer-events-auto, so the HUD can never swallow a click meant for a
 * portrait frame in the canvas underneath.
 */
export function GalleryHUD({ walls, activeWall, pct, shownCount, total, started, hasOpened, onDot, onExit }: GalleryHUDProps) {
  const wall = walls[activeWall] ?? walls[0];
  const atEnd = pct >= 97;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6" aria-hidden={false}>
      {/* Top row: hint + wall name */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={cn(
              "font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 transition-opacity duration-700",
              started ? "opacity-0" : "opacity-100"
            )}
          >
            Scroll to explore — move your mouse to look around
          </p>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300/90">
            Mouse: inverted look — turn fully to face the walls
          </p>
          {!hasOpened && started && (
            <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              <MousePointerClick className="h-3.5 w-3.5 text-amber-300" />
              Click a portrait to view it
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">
            Wall {activeWall + 1} of {walls.length} — {wall?.name ?? ""}
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
            Showing {shownCount} of {total} works
          </p>
        </div>
      </div>

      {/* Big wall heading — large serif, crossfades per wall */}
      <div key={wall?.id ?? "none"} className="pointer-events-none absolute left-1/2 top-[16%] w-full max-w-3xl -translate-x-1/2 px-4 text-center">
        <p className="font-display text-[clamp(2.2rem,5.5vw,4.25rem)] italic leading-none text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]">
          {wall?.name ?? ""}
        </p>
        <p className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
          {wall?.subtitle ?? ""}
        </p>
      </div>

      {/* Bottom row: progress + dots + exit */}
      <div className="pointer-events-auto mx-auto flex w-full max-w-xl flex-col items-center gap-3">
        {atEnd && (
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-amber-500"
          >
            Exit gallery — continue
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
        <div className="flex items-center gap-3 rounded-full bg-black/45 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-1.5" role="group" aria-label="Gallery walls">
            {walls.map((w, i) => (
              <button
                key={w.id}
                type="button"
                onClick={() => onDot(i)}
                aria-label={`Go to ${w.name}`}
                aria-current={i === activeWall ? "true" : undefined}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all",
                  i === activeWall ? "scale-125 bg-amber-400" : "bg-white/35 hover:bg-white/60"
                )}
              />
            ))}
          </div>
          <div className="h-1 w-28 overflow-hidden rounded-full bg-white/20 sm:w-40" aria-hidden="true">
            <div className="h-full rounded-full bg-amber-400 transition-[width] duration-300" style={{ width: `${pct}%` }} />
          </div>
          <span className="font-mono text-[11px] font-semibold tabular-nums text-white/80">{pct}%</span>
        </div>
      </div>
    </div>
  );
}
