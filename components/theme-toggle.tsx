"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Star, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ThemeToggle — v14: animated sun / moon / stars.
 *
 * Light mode shows a Lucide Sun whose rays slowly rotate; dark mode shows
 * a Lucide Moon with two twinkling Stars. Switching rotates + scales the
 * icon (180° flip) and fires a switch effect: a soft radial circle wipes
 * out from the button in the NEW theme's paper colour, with a small burst
 * of amber stars — then fades away to reveal the new theme underneath.
 *
 * The page cross-fades with it: globals.css gives body/header/footer/
 * surfaces a 0.5s colour transition, and providers.tsx no longer sets
 * disableTransitionOnChange (that flag used to kill transitions on switch).
 * next-themes still owns the choice and remembers it.
 */

const STARS = [
  { angle: -90, dist: 96 },
  { angle: -30, dist: 110 },
  { angle: 30, dist: 88 },
  { angle: 90, dist: 104 },
  { angle: 150, dist: 92 },
  { angle: 210, dist: 108 },
];

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [burst, setBurst] = useState<{ x: number; y: number; dark: boolean } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();
  useEffect(() => setMounted(true), []);
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" aria-label="Toggle theme" disabled>
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const dark = resolvedTheme === "dark";

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nextDark = !dark;
    setTheme(nextDark ? "dark" : "light");
    if (reduce) return;
    setBurst({ x: r.left + r.width / 2, y: r.top + r.height / 2, dark: nextDark });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setBurst(null), 1150);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-10 w-10 overflow-hidden rounded-full border border-zinc-200 dark:border-white/10"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggle}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={dark ? "moon" : "sun"}
            className="relative grid h-5 w-5 place-items-center"
            initial={{ rotate: -120, scale: 0.3, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 120, scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {dark ? (
              <>
                <Moon className="h-[18px] w-[18px] text-amber-400" fill="currentColor" />
                {/* Twinkling stars around the moon */}
                <motion.span
                  className="absolute -right-1 -top-1 text-amber-300"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.1, 0.7] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Star className="h-2.5 w-2.5" fill="currentColor" />
                </motion.span>
                <motion.span
                  className="absolute -bottom-0.5 -left-1 text-amber-200"
                  animate={{ opacity: [1, 0.3, 1], scale: [1.1, 0.7, 1.1] }}
                  transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Star className="h-2 w-2" fill="currentColor" />
                </motion.span>
              </>
            ) : (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="grid place-items-center"
              >
                <Sun className="h-[18px] w-[18px] text-amber-600" />
              </motion.span>
            )}
          </motion.span>
        </AnimatePresence>
      </Button>

      {/* Switch effect — radial wipe + star burst from the toggle button */}
      {burst && (
        <motion.div
          key="theme-wipe"
          className="pointer-events-none fixed inset-0 z-[100]"
          style={{ backgroundColor: burst.dark ? "#0f0e0c" : "#faf7f2" }}
          initial={{ clipPath: `circle(0px at ${burst.x}px ${burst.y}px)`, opacity: 1 }}
          animate={{
            clipPath: `circle(150vmax at ${burst.x}px ${burst.y}px)`,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1.1, times: [0, 0.65, 1], ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {STARS.map((s, i) => {
            const rad = (s.angle * Math.PI) / 180;
            return (
              <motion.span
                key={i}
                className="absolute text-amber-500"
                style={{ left: burst.x, top: burst.y }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: Math.cos(rad) * s.dist,
                  y: Math.sin(rad) * s.dist,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  rotate: 180,
                }}
                transition={{ duration: 0.9, times: [0, 0.4, 1], ease: "easeOut" }}
              >
                <Star className="h-3.5 w-3.5" fill="currentColor" />
              </motion.span>
            );
          })}
        </motion.div>
      )}
    </>
  );
}
