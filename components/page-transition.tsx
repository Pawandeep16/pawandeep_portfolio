"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Apple-style page transition: navigating between routes fades the old
 * page out (and slightly up) and the new one in (rising gently), on the
 * same ease the hero entrance uses. Anchor links (#about, #projects)
 * don't change the pathname, so they never trigger it. Reduced motion
 * renders pages statically. `initial={false}` so the first load shows
 * immediately — the hero's own entrance still plays there.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
