"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { CheckCircle2, ClipboardCheck, MapPin, MonitorPlay, Truck, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { TruckVector } from "@/components/truck-vector";

/**
 * The Driver Check-in journey as a scroll-driven 3D scene — now with real
 * vector art: a detailed delivery truck (inline SVG, wheels spin with
 * scroll) carrying an isometric parcel, travelling a perspective road from
 * the warehouse to the destination pin. The % and status pill are tied to
 * scroll progress only — an illustration of the flow, never live data.
 */
const STAGES = [
  { icon: UserCheck, title: "Check-in", line: "Driver authenticates, route validated, inside 300 m geofence.", status: "CHECKED IN" },
  { icon: ClipboardCheck, title: "Loading", line: "Within capacity → Loading. Otherwise Queued, then promoted.", status: "LOADING" },
  { icon: MonitorPlay, title: "Serving", line: "Live board: Expected vs Checked-in, in real time.", status: "SERVING" },
  { icon: CheckCircle2, title: "Complete", line: "Route done, next driver promoted, records updated.", status: "COMPLETE" },
];

const STAGE_ICONS = [UserCheck, ClipboardCheck, MonitorPlay, CheckCircle2];

export function DispatchJourney({
  compact = false,
  stages = STAGES,
}: {
  compact?: boolean;
  stages?: { title: string; line: string; status: string }[];
}) {
  const display = stages.map((s, i) => ({ ...s, icon: STAGE_ICONS[i] ?? Truck }));
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [pct, setPct] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 26, mass: 0.5 });

  const rotateX = useTransform(smooth, [0, 0.3, 1], [55, 32, 8]);
  const sceneScale = useTransform(smooth, [0, 1], [0.82, 1]);
  const sceneY = useTransform(smooth, [0, 1], [140, 0]);
  const sceneOpacity = useTransform(smooth, [0, 0.08], [0.35, 1]);
  const truckLeft = useTransform(smooth, [0, 1], ["4%", "82%"]);
  const truckScale = useTransform(smooth, [0, 1], [0.8, 1.18]);
  const truckShadow = useTransform(smooth, [0, 1], [0.25, 0.5]);
  const skylineY = useTransform(smooth, [0, 1], [30, -60]);
  const dashY = useTransform(smooth, [0, 1], [0, 320]);
  // Wheels spin ~3 full turns across the whole journey.
  const wheelRotation = useTransform(smooth, [0, 1], [0, 1080]);
  // Speed lines + dust trail grow with progress.
  const speedOpacity = useTransform(smooth, [0, 0.15, 0.9, 1], [0, 0.8, 0.8, 0]);

  useMotionValueEvent(smooth, "change", (v) => {
    setStage(Math.min(display.length - 1, Math.floor(v * display.length)));
    setPct(Math.round(v * 100));
  });

  if (reduce) {
    return (
      <section aria-label="Driver check-in journey" className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="eyebrow text-center">06 · The dispatch journey</p>
          <h2 className="mt-3 text-center font-display text-4xl text-stone-900 dark:text-stone-50 sm:text-5xl">
            One driver, one route — <em className="serif-accent text-amber-700 dark:text-amber-500">start to finish.</em>
          </h2>
          <Image src="/assets/truck-side.svg" alt="Delivery truck, side view" width={640} height={260} className="mx-auto mt-8 h-auto w-full max-w-md" />
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
        </div>
      </section>
    );
  }

  const active = display[stage];
  const height = compact ? "h-[250vh]" : "h-[400vh]";

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

          <div className="relative mt-10 [perspective:1400px]" aria-hidden="true">
            <motion.div style={{ y: skylineY }} className="pointer-events-none absolute inset-x-0 -top-6 flex items-end justify-between opacity-25 dark:opacity-20">
              {[56, 84, 48, 96, 64, 78, 52, 88].map((h, i) => (
                <span key={i} className="w-10 rounded-t-sm bg-stone-400 dark:bg-stone-500 sm:w-16" style={{ height: h }} />
              ))}
            </motion.div>

            <motion.div
              style={{ rotateX, scale: sceneScale, y: sceneY, opacity: sceneOpacity, transformPerspective: 1400 }}
              className="relative h-[300px] overflow-hidden rounded-2xl border border-stone-200/80 bg-gradient-to-b from-stone-100 via-stone-200/60 to-stone-300/70 shadow-2xl shadow-stone-900/20 [transform-style:preserve-3d] dark:border-white/10 dark:from-[#171410] dark:via-[#1d1811] dark:to-[#241b10] sm:h-[340px]"
            >
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-500/25 to-transparent" />
              {/* Warehouse at the start of the route */}
              <div className="absolute left-3 top-3 w-28 sm:w-36">
                <Image src="/assets/warehouse.svg" alt="" width={640} height={360} className="h-auto w-full rounded-lg" />
              </div>
              {/* Destination pin at the far end */}
              <div className="absolute right-4 top-4 flex flex-col items-center">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-600 text-white shadow-lg"><MapPin className="h-5 w-5" /></span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Destination</span>
              </div>
              {/* The road — a trapezoid in perspective */}
              <div className="absolute bottom-0 left-1/2 h-[78%] w-[130%] -translate-x-1/2 bg-stone-800 dark:bg-stone-950" style={{ clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)" }} />
              <motion.div style={{ backgroundPositionY: dashY }} className="absolute bottom-0 left-1/2 h-[78%] w-1 -translate-x-1/2">
                <div className="h-full w-full bg-[repeating-linear-gradient(to_bottom,transparent_0_14px,#f5f1ea_14px_30px)]" />
              </motion.div>
              {/* Route stops */}
              <div className="absolute inset-x-0 bottom-6 flex justify-between px-6 sm:px-14">
                {display.map((s, i) => (
                  <span key={s.title} className="flex flex-col items-center gap-2">
                    <span className={cn("grid h-8 w-8 place-items-center rounded-full border-2 font-mono text-[11px] font-bold transition-all duration-500", i <= stage ? "border-amber-500 bg-amber-600 text-white" : "border-white/40 bg-stone-700 text-white/60")}>{i + 1}</span>
                    <span className={cn("font-mono text-[10px] uppercase tracking-[0.18em]", i <= stage ? "text-white" : "text-white/50")}>{s.title}</span>
                  </span>
                ))}
              </div>
              {/* Speed lines + dust behind the truck */}
              <motion.div style={{ left: truckLeft, opacity: speedOpacity }} className="absolute bottom-[24%] -translate-x-[130%]">
                <div className="flex flex-col gap-2">
                  <span className="block h-1 w-16 rounded-full bg-white/60" />
                  <span className="block h-1 w-10 rounded-full bg-white/40" />
                  <span className="block h-1 w-14 rounded-full bg-white/50" />
                </div>
              </motion.div>
              {/* The truck — vector art, wheels spin with scroll; parcel bounces at each stop */}
              <motion.div style={{ left: truckLeft, scale: truckScale }} className="absolute bottom-[26%] w-56 -translate-x-1/2 sm:w-72">
                <motion.div style={{ opacity: truckShadow }} className="mx-auto h-3 w-3/4 rounded-[50%] bg-black/50 blur-md" aria-hidden="true" />
                <div className="relative -mt-4">
                  <TruckVector wheelRotation={wheelRotation} className="h-auto w-full drop-shadow-2xl" />
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-9 right-2 w-12 sm:w-14"
                  >
                    <Image src="/assets/parcel-box.svg" alt="Parcel riding on the truck" width={320} height={260} className="h-auto w-full" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {display.map((s, i) => {
              const isActive = i === stage;
              const isPast = i < stage;
              return (
                <motion.article
                  key={s.title}
                  aria-current={isActive ? "step" : undefined}
                  animate={{ scale: isActive ? 1.05 : isPast ? 0.97 : 0.94, opacity: isActive ? 1 : isPast ? 0.75 : 0.45, y: isActive ? -6 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={cn("rounded-2xl border p-5", isActive ? "border-amber-600/60 bg-white shadow-xl shadow-amber-600/10 dark:border-amber-500/50 dark:bg-white/[0.06]" : "border-stone-200 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]")}
                >
                  <span className={cn("grid h-11 w-11 place-items-center rounded-md", isActive ? "bg-amber-600 text-white" : "bg-amber-600/10 text-amber-600 dark:text-amber-400")}><s.icon className="h-5 w-5" /></span>
                  <p className="mt-4 text-base font-semibold text-stone-900 dark:text-white"><span className="mr-2 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">0{i + 1}</span>{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{s.line}</p>
                  <p className={cn("mt-3 inline-flex rounded-md px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide", isActive ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-stone-100 text-stone-500 dark:bg-white/5 dark:text-stone-500")}>{s.status}</p>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-6 flex min-h-[3.5rem] flex-wrap items-center gap-3" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={active.title}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                transition={{ duration: 0.35 }}
                className="font-display text-3xl text-stone-900 dark:text-stone-50 sm:text-4xl"
              >
                {active.title} <em className="serif-accent text-amber-700 dark:text-amber-500">— {active.status.toLowerCase()}</em>
              </motion.span>
            </AnimatePresence>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">Step {stage + 1} of {display.length} · {active.line}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
