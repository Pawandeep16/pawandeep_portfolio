"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { QUICK_LINKS, searchSite, type SearchEntry } from "@/lib/site-search";
import { navigateToSection } from "@/lib/nav";
import { cn } from "@/lib/utils";

interface SiteSearchProps {
  open: boolean;
  onClose: () => void;
}

const KIND_STYLE: Record<SearchEntry["kind"], string> = {
  Section: "bg-zinc-100 text-zinc-600 dark:bg-white/10 dark:text-zinc-300",
  Project: "bg-amber-600/10 text-amber-700 dark:text-amber-400",
  Skill: "bg-sky-600/10 text-sky-700 dark:text-sky-400",
  Experience: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400",
};

/**
 * Apple-style search overlay: drops from the nav with a dimmed backdrop,
 * quick links when empty, live results as you type. Keyboard: ↑/↓ to move,
 * Enter to open, Esc to close. ⌘K / Ctrl+K opens it from anywhere.
 */
export function SiteSearch({ open, onClose }: SiteSearchProps) {
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => searchSite(query), [query]);
  const shown = query.trim() ? results : QUICK_LINKS;

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [open ]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open ]);

  const go = (entry: SearchEntry) => {
    onClose();
    if (entry.href.startsWith("/#")) {
      navigateToSection(entry.href.slice(1), pathname ?? "/", (url) => router.push(url));
    } else {
      router.push(entry.href);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, shown.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = shown[active];
      if (entry) go(entry);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search this site">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.99 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 mx-auto mt-20 w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/20 dark:border-white/10 dark:bg-[#1a1815] sm:mt-24"
          >
            <div className="flex items-center gap-3 border-b border-zinc-200/70 px-5 py-4 dark:border-white/10">
              <Search className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search projects, skills, experience…"
                aria-label="Search this site"
                aria-expanded={shown.length > 0}
                aria-controls="site-search-results"
                aria-activedescendant={shown.length ? `site-search-${shown[active]?.id}` : undefined}
                role="combobox"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul ref={listRef} id="site-search-results" role="listbox" className="max-h-[55vh] overflow-y-auto p-2">
              <li className="px-3 pb-1 pt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                {query.trim() ? (results.length ? `${results.length} result${results.length === 1 ? "" : "s"}` : "No results") : "Quick links"}
              </li>
              {query.trim() && results.length === 0 && (
                <li className="px-3 py-6 text-sm text-zinc-500 dark:text-zinc-400">
                  Nothing matches “{query}” — try a project, a skill like React, or a section like Contact.
                </li>
              )}
              {shown.map((entry, i) => (
                <li key={entry.id} id={`site-search-${entry.id}`} role="option" aria-selected={i === active}>
                  {entry.href.startsWith("/#") ? (
                    <a
                      href={entry.href}
                      onMouseEnter={() => setActive(i)}
                      onClick={(e) => {
                        e.preventDefault();
                        go(entry);
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-3 py-2.5 transition",
                        i === active ? "bg-zinc-100 dark:bg-white/10" : "",
                      )}
                    >
                      <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold", KIND_STYLE[entry.kind])}>
                        {entry.kind}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-semibold text-zinc-900 dark:text-white">{entry.title}</span>
                        <span className="block truncate text-sm text-zinc-500 dark:text-zinc-400">{entry.description}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={entry.href}
                      onMouseEnter={() => setActive(i)}
                      onClick={(e) => {
                        e.preventDefault();
                        go(entry);
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-3 py-2.5 transition",
                        i === active ? "bg-zinc-100 dark:bg-white/10" : "",
                      )}
                    >
                      <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold", KIND_STYLE[entry.kind])}>
                        {entry.kind}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-semibold text-zinc-900 dark:text-white">{entry.title}</span>
                        <span className="block truncate text-sm text-zinc-500 dark:text-zinc-400">{entry.description}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 border-t border-zinc-200/70 px-5 py-2.5 font-mono text-[11px] text-zinc-400 dark:border-white/10">
              <span><kbd className="rounded border border-zinc-300 px-1.5 py-0.5 dark:border-white/20">↑↓</kbd> to move</span>
              <span><kbd className="rounded border border-zinc-300 px-1.5 py-0.5 dark:border-white/20">↵</kbd> to open</span>
              <span><kbd className="rounded border border-zinc-300 px-1.5 py-0.5 dark:border-white/20">esc</kbd> to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
