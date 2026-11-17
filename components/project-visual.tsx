"use client";

import Image from "next/image";
import { imageUrl } from "@/lib/sanity";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Labelled placeholder mockup — never presented as a real screenshot. */
export function PlaceholderMockup({ title, label = "Product visual — placeholder mockup", className }: { title: string; label?: string; className?: string }) {
  return (
    <div className={cn("relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-amber-600/10 via-white to-orange-600/10 dark:border-white/10 dark:from-amber-600/20 dark:via-[#141417] dark:to-orange-600/20", className)}>
      <div className="flex items-center gap-1.5 border-b border-zinc-200/70 px-4 py-3 dark:border-white/10" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate text-xs text-zinc-500 dark:text-zinc-400">{title}</span>
      </div>
      <div className="dot-grid flex flex-1 items-center justify-center p-6">
        <p className="max-w-xs text-center text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-300">{title}</p>
      </div>
      <p className="border-t border-zinc-200/70 px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-zinc-500 dark:border-white/10 dark:text-zinc-500">{label}</p>
    </div>
  );
}

export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const src = imageUrl(project.image, 1200);
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10", className)}>
        <Image src={src} alt={`${project.title} — project image`} width={1200} height={675} className="h-auto w-full object-cover" />
      </div>
    );
  }
  return <PlaceholderMockup title={project.title} className={className} />;
}
