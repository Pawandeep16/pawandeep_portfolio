"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Slim sticky side index (desktop only): typography as navigation. */
const SECTIONS = [
  { id: "about", num: "01", label: "About" },
  { id: "skills", num: "02", label: "Skills" },
  { id: "experience", num: "03", label: "Experience" },
  { id: "education", num: "04", label: "Study" },
  { id: "projects", num: "05", label: "Projects" },
  { id: "dispatch-journey", num: "06", label: "Dispatch" },
  { id: "gallery", num: "07", label: "Artwork" },
  { id: "certifications", num: "08", label: "Certified" },
  { id: "testimonials", num: "09", label: "Kind words" },
  { id: "contact", num: "10", label: "Contact" },
];

export function SectionIndex() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) setActive(e.target.id); },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Page index" className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 2xl:flex">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-current={active === s.id ? "true" : undefined}
          className={cn(
            "group flex items-center gap-2 rounded-full py-1 pl-2 pr-3 font-mono text-[10px] uppercase tracking-[0.16em] transition",
            active === s.id
              ? "bg-stone-900 text-white dark:bg-white dark:text-stone-900"
              : "text-stone-400 hover:text-stone-900 dark:text-stone-500 dark:hover:text-white"
          )}
        >
          <span className={active === s.id ? "text-amber-400" : "text-amber-600/70 dark:text-amber-500/70"}>{s.num}</span>
          <span className={cn("max-w-0 overflow-hidden transition-all duration-300 group-hover:max-w-[80px]", active === s.id && "max-w-[80px]")}>{s.label}</span>
        </a>
      ))}
    </nav>
  );
}
