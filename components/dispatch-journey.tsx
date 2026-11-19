"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { CheckCircle2, ClipboardCheck, MonitorPlay, Truck, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The Driver Check-in journey as a scroll story with real photos — v23.
 * The old 3D road/truck scene is gone. Now: a sticky two-column scene
 * (steps on the left, a large photo on the right) that crossfades between
 * four real warehouse/delivery photos as the visitor scrolls, one per
 * stage. The % and status are tied to scroll progress only — an
 * illustration of the flow, never live data. Photos: Unsplash.
 */

const STAGES = [
  {
    icon: UserCheck,
    title: "Check-in",
    line: "Driver authenticates, route validated, inside 300 m geofence.",
    status: "CHECKED IN",
    photo:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    alt: "Warehouse floor with parcels and yellow picking bins",
  },
  {
    icon: ClipboardCheck,
    title: "Loading",
    line: "Within capacity → Loading. Otherwise Queued, then promoted.",
    status: "LOADING",
    photo:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1600&q=80",
    alt: "Parcels stacked inside a delivery van, ready to load",
  },
  {
    icon: MonitorPlay,
    title: "Serving",
    line: "Live board: Expected vs Checked-in, in real time.",
    status: "SERVING",
    photo:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80",
    alt: "Delivery truck driving on the highway",
  },
  {
    icon: CheckCircle2,
    title: "Complete",
    line: "Route done, next driver promoted, records updated.",
    status: "COMPLETE",
    photo:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1600&q=80",
    alt: "Courier handing a parcel to a customer",
  },
];

const STAGE_ICONS = [UserCheck, ClipboardCheck, MonitorPlay, CheckCircle2];

export function DispatchJourney({
  compact = false,
  stages = STAGES,
}: {
  compact?: boolean;
  stages?: { title: string; line: string; status: string }[];
}) {
  const display = stages.map((s, i) => ({
    ...STAGES[i],
    ...s,
    icon: STAGE_ICONS[i] ?? Truck,
  }));
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [pct, setPct] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 26, mass: 0.5 });

  useMotionValueEvent(smooth, "change", (v) => {
    setStage(Math.min(display.length - 1, Math.floor(v * display.length)));
    setPct(Math.round(v * 100));
  });

  /** Jump to a stage by scrolling the page to its part of the scene. */
  const jumpToStage = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((i + 0.5) / display.length) * total,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  if (reduce) {
    return (
      <section aria-label="Driver check-in journey" className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="eyebrow text-center">06 · The dispatch journey</p>
          <h2 className="mt-3 text-center font-display text-4xl text-stone-900 dark:text-stone-50 sm:text-5xl">
            One driver, one route — <em className="serif-accent text-amber-700 dark:text-amber-500">start to finish.</em>
          </h2>
          <div className="relative mt-8 overflow-hidden rounded-2xl">
            <Image src={display[0].photo} alt={display[0].alt} width={1600} height={1200} className="h-auto w-full" />
          </div>
          <ol className="mt-10 space-y-4">
            {display.map((s, i) => (
              <li key={s.title} className="card-surface flex items-start gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-amber-600/10 text-amber-600 dark:text-amber-400"><s.icon className="h-5 w-5" /></span>
                <span>
                  <span className="block text-base font-semibold text-stone-900 dark:text-white">{i + 1}. {s.title} <span className="ml-1 font-mono text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">{s.status}</span></span>
                  <span className="mt-1 block text-sm text-stone-600 dark:text-stone-400">{s.line}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">Photos: Unsplash</p>
        </div>
      </section>
    );
  }

  const active = display[stage];
  const height = compact ? "h-[220vh]" : "h-[300vh]";

  return (
    <section id="dispatch-journey" ref={ref} aria-label="Driver check-in journey" className={cn("relative", height)}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">06 · The dispatch journey</p>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] text-stone-900 dark:text-stone-50">
                One driver, one route — <em className="serif-accent text-amber-700 dark:text-amber-500">start to finish.</em>
              </h2>
            </div>
            <div className="text-right">
              <p className="font-display text-5xl tabular-nums text-amber-600 dark:text-amber-500">{pct}%</p>
              <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">Scroll to drive the route</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Steps — horizontal rows; the active one highlights. Click to jump. */}
            <ol className="flex flex-col justify-center gap-3">
              {display.map((s, i) => {
                const isActive = i === stage;
                const isPast = i < stage;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => jumpToStage(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-500",
                        isActive
                          ? "border-amber-600/60 bg-white shadow-xl shadow-amber-600/10 dark:border-amber-500/50 dark:bg-white/[0.06]"
                          : "border-stone-200 bg-white/60 hover:border-stone-300 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20",
                      )}
                      style={{ opacity: isActive ? 1 : isPast ? 0.7 : 0.45 }}
                    >
                      <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-md transition-colors", isActive ? "bg-amber-600 text-white" : "bg-amber-600/10 text-amber-600 dark:text-amber-400")}>
                        <s.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2 text-base font-semibold text-stone-900 dark:text-white">
                          <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">0{i + 1}</span>
                          {s.title}
                          <span className={cn("rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide", isActive ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-stone-100 text-stone-500 dark:bg-white/5 dark:text-stone-500")}>{s.status}</span>
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-stone-600 dark:text-stone-400">{s.line}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Photo — crossfades between the four real photos as the stage changes. */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-stone-900/20">
                {display.map((s, i) => (
                  <motion.div
                    key={s.title}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: i === stage ? 1 : 0, scale: i === stage ? 1 : 1.06 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden={i !== stage}
                  >
                    <Image
                      src={s.photo}
                      alt={i === stage ? s.alt : ""}
                      width={1600}
                      height={1200}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                ))}
                {/* Caption chip over the photo */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
                  Step {stage + 1} of {display.length} · {active.title}
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[11px] font-bold tabular-nums text-white backdrop-blur">
                  {pct}%
                </div>
              </div>
              {/* Progress bar under the photo */}
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-stone-200 dark:bg-white/10" aria-hidden="true">
                <motion.div
                  className="h-full bg-amber-600"
                  animate={{ width: `${((stage + 1) / display.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">Photos: Unsplash</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
