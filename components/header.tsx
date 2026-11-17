"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { IconButton } from "@/components/animated-icon";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#education", label: "Study", id: "education" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#gallery", label: "Gallery", id: "gallery" },
  { href: "#testimonials", label: "Testimonials", id: "testimonials" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export function Header() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const item of NAV) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    const home = document.getElementById("home");
    if (home) observer.observe(home);
    return () => observer.disconnect();
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all", scrolled ? "border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#0f0e0c]/80" : "bg-transparent")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="group flex items-center gap-3" aria-label="Pawandeep Singh Thandi — home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-600 text-sm font-bold text-white shadow-lg shadow-amber-600/30 transition group-hover:rotate-6" aria-hidden="true">PT</span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-zinc-900 dark:text-white">Pawandeep Thandi</span>
            <span className="block text-xs text-zinc-500 dark:text-zinc-400">Developer · Designer · Ops</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={active === item.id ? "true" : undefined}
              className={cn("rounded-full px-3.5 py-2 text-sm font-medium transition", active === item.id ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white")}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="/resume.pdf" download className="btn-primary hidden !px-4 !py-2.5 sm:inline-flex"><Download className="h-4 w-4" /> Resume</a>
          <IconButton type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}
            className="h-10 w-10 rounded-full border border-zinc-200 text-zinc-900 dark:border-white/10 dark:text-white lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </IconButton>
        </div>
      </div>
      <motion.div aria-hidden="true" style={{ scaleX: progress }} className="h-[2px] origin-left bg-amber-600" />

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-zinc-200 bg-white dark:border-white/10 dark:bg-[#0f0e0c] lg:hidden" aria-label="Mobile">
            <ul className="space-y-1 px-4 py-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-white/5">{item.label}</Link>
                </li>
              ))}
              <li><a href="/resume.pdf" download className="btn-primary mt-2 w-full"><Download className="h-4 w-4" /> Download resume</a></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
