"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, Download, Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { IconButton } from "@/components/animated-icon";
import { SiteSearch } from "@/components/site-search";
import { MEGA_MENUS, MegaMenuPanel, type MegaMenuId } from "@/components/mega-menu";
import { navigateToSection } from "@/lib/nav";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  id: string;
  menu?: MegaMenuId;
}

const NAV: NavItem[] = [
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills", menu: "skills" },
  { href: "#experience", label: "Experience", id: "experience", menu: "experience" },
  { href: "#education", label: "Study", id: "education" },
  { href: "#projects", label: "Projects", id: "projects", menu: "projects" },
  { href: "#gallery", label: "Gallery", id: "gallery" },
  { href: "#testimonials", label: "Testimonials", id: "testimonials" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const MENU_LABEL: Record<MegaMenuId, string> = {
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
};

export function Header() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  const [openMenu, setOpenMenu] = useState<MegaMenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MegaMenuId | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const closeTimer = useRef<number | null>(null);

  const closeMenu = () => setOpenMenu(null);
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  const goSection = (hash: string) => {
    closeMenu();
    setMobileOpen(false);
    navigateToSection(hash, pathname, (url) => router.push(url));
  };

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
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const item of NAV) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    const home = document.getElementById("home");
    if (home) observer.observe(home);
    return () => observer.disconnect();
  }, []);

  // Escape closes everything; Cmd/Ctrl+K opens search from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        setSearchOpen(false);
        setMobileOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        closeMenu();
        setMobileOpen(false);
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const openSearch = () => {
    closeMenu();
    setMobileOpen(false);
    setSearchOpen(true);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled || openMenu
          ? "glass border-b border-white/50 dark:border-white/10"
          : "bg-transparent",
      )}
      onBlur={(e) => {
        // Keyboard users: close the mega menu once focus leaves the header.
        if (!e.currentTarget.contains(e.relatedTarget as Node)) closeMenu();
      }}
    >
      {/* Dimmed backdrop behind an open mega menu — click closes it, and
          moving the pointer onto it starts the close delay. */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 -z-10 bg-zinc-950/25 backdrop-blur-[2px]"
            onClick={closeMenu}
            onMouseEnter={scheduleClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div
        className="relative mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        onMouseEnter={cancelClose}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Pawandeep Singh Thandi — home">
          <Image src="/assets/portrait.jpg" alt="" width={64} height={64} className="h-8 w-8 rounded-full object-cover ring-1 ring-black/10 transition group-hover:scale-105 dark:ring-white/20" aria-hidden="true" />
          <span className="leading-tight">
            <span className="block text-sm font-bold text-zinc-900 dark:text-white">Pawandeep Thandi</span>
            <span className="hidden text-[11px] text-zinc-500 dark:text-zinc-400 sm:block">Developer · Designer · Ops</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.menu ? (
              <button
                key={item.href}
                type="button"
                aria-expanded={openMenu === item.menu}
                aria-haspopup="true"
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu(item.menu!);
                }}
                onFocus={() => {
                  cancelClose();
                  setOpenMenu(item.menu!);
                }}
                onClick={() => {
                  // First tap opens the menu; a tap while open follows the link.
                  if (openMenu === item.menu) goSection(item.href);
                  else setOpenMenu(item.menu!);
                }}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition",
                  openMenu === item.menu || active === item.id
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white",
                )}
              >
                {item.label}
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", openMenu === item.menu && "rotate-180")} aria-hidden="true" />
              </button>
            ) : (
              <a
                key={item.href}
                href={`/${item.href}`}
                aria-current={active === item.id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  goSection(item.href);
                }}
                onMouseEnter={cancelClose}
                className={cn(
                  "rounded-full px-3 py-2 text-[13px] font-medium transition",
                  active === item.id
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white",
                )}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-1.5">
          <IconButton
            type="button"
            onClick={openSearch}
            aria-label="Search this site (Command K)"
            className="h-9 w-9 rounded-full border border-zinc-200 text-zinc-900 dark:border-white/10 dark:text-white"
          >
            <Search className="h-4 w-4" />
          </IconButton>
          <ThemeToggle />
          <a href="/resume.pdf" download className="btn-primary hidden !px-3.5 !py-2 !text-[13px] sm:inline-flex">
            <Download className="h-4 w-4" /> Resume
          </a>
          <IconButton
            type="button"
            onClick={() => {
              closeMenu();
              setMobileOpen((v) => !v);
            }}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="h-9 w-9 rounded-full border border-zinc-200 text-zinc-900 dark:border-white/10 dark:text-white lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </IconButton>
        </div>
      </div>
      <motion.div aria-hidden="true" style={{ scaleX: progress }} className="relative h-[2px] origin-left bg-amber-600" />

      <AnimatePresence>
        {openMenu && (
          <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} className="relative">
            <MegaMenuPanel id={openMenu} onSection={goSection} onClose={closeMenu} />
          </div>
        )}
      </AnimatePresence>

      {/* Full-screen mobile menu with expandable sections. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass fixed inset-0 z-[60] overflow-y-auto lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-12 items-center justify-between px-4 sm:px-6">
              <span className="flex items-center gap-2.5">
                <Image src="/assets/portrait.jpg" alt="" width={64} height={64} className="h-8 w-8 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/20" aria-hidden="true" />
                <span className="text-sm font-bold text-zinc-900 dark:text-white">Pawandeep Thandi</span>
              </span>
              <IconButton
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="h-9 w-9 rounded-full border border-zinc-200 text-zinc-900 dark:border-white/10 dark:text-white"
              >
                <X className="h-5 w-5" />
              </IconButton>
            </div>

            <nav className="px-4 pb-10 pt-2 sm:px-6" aria-label="Mobile">
              <button
                type="button"
                onClick={openSearch}
                className="mb-4 flex w-full items-center gap-3 rounded-2xl bg-zinc-100 px-4 py-3 text-left text-[15px] text-zinc-500 dark:bg-white/5 dark:text-zinc-400"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Search projects, skills, experience…
                <kbd className="ml-auto rounded border border-zinc-300 px-1.5 py-0.5 font-mono text-[11px] dark:border-white/20">⌘K</kbd>
              </button>

              <ul className="space-y-1">
                {NAV.map((item) =>
                  item.menu ? (
                    <li key={item.href} className="overflow-hidden rounded-2xl">
                      <button
                        type="button"
                        aria-expanded={mobileSection === item.menu}
                        onClick={() => setMobileSection((v) => (v === item.menu ? null : item.menu!))}
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-semibold text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-white/5"
                      >
                        {MENU_LABEL[item.menu]}
                        <ChevronDown className={cn("h-4 w-4 text-zinc-400 transition-transform", mobileSection === item.menu && "rotate-180")} aria-hidden="true" />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileSection === item.menu && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className="space-y-0.5 px-4 pb-3">
                              {MEGA_MENUS[item.menu].columns.flatMap((col) => col.links).map((link) =>
                                link.section ? (
                                  <li key={link.title}>
                                    <a
                                      href={link.href}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        goSection(link.href.replace("/", ""));
                                      }}
                                      className="block rounded-xl px-3 py-2 text-[15px] text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5"
                                    >
                                      {link.title}
                                    </a>
                                  </li>
                                ) : (
                                  <li key={link.title}>
                                    <Link href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2 text-[15px] text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5">
                                      {link.title}
                                    </Link>
                                  </li>
                                ),
                              )}
                              <li>
                                <a
                                  href={`/${item.href}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    goSection(item.href);
                                  }}
                                  className="block rounded-xl px-3 py-2 text-[15px] font-semibold text-amber-700 dark:text-amber-400"
                                >
                                  View all {MENU_LABEL[item.menu].toLowerCase()} →
                                </a>
                              </li>
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={item.href}>
                      <a
                        href={`/${item.href}`}
                        onClick={(e) => {
                          e.preventDefault();
                          goSection(item.href);
                        }}
                        className="block rounded-2xl px-4 py-3 text-base font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-white/5"
                      >
                        {item.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>

              <a href="/resume.pdf" download className="btn-primary mt-6 w-full">
                <Download className="h-4 w-4" /> Download resume
              </a>
              <p className="mt-6 px-1 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                Mississauga, ON · Available immediately
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
