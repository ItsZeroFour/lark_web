"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Услуги", href: "/#services", section: "services" },
  { label: "Процесс", href: "/#process", section: "process" },
  { label: "Работы", href: "/#portfolio", section: "portfolio" },
  { label: "Команда", href: "/#team", section: "team" },
  { label: "Larkins", href: "/larkins", section: null },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Reading-progress bar tied to page scroll.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for whichever section sits in the viewport band.
  useEffect(() => {
    const sections = navLinks
      .map((l) => l.section)
      .filter((s): s is string => Boolean(s));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-gradient-to-r
                   from-accent to-accent-light"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <nav
          className={cn(
            "shell flex items-center justify-between rounded-2xl !px-3 sm:!px-5",
            "transition-[background-color,border-color,box-shadow,height] duration-300 ease-cinematic",
            scrolled || open
              ? "floating shadow-float h-12 sm:h-14"
              : "h-14 border border-transparent sm:h-16",
          )}
        >
          {/* Wordmark */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Lark Freelance — на главную"
            className="group flex items-center gap-2 cursor-pointer"
          >
            <Logo
              size={30}
              className="text-accent transition-transform duration-300
                         ease-cinematic group-hover:-translate-y-0.5"
            />
            <span className="font-display text-lg tracking-tight">
              Lark<span className="text-text-muted"> Freelance</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = link.section !== null && active === link.section;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative rounded-lg px-3 py-2 text-sm transition-colors duration-200 cursor-pointer",
                      isActive
                        ? "text-text"
                        : "text-text-muted hover:text-text",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2 -bottom-0.5 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Magnetic strength={0.25}>
              <Button href="/#contact">
                Обсудить проект
                <Icon name="arrow-right" size={15} />
              </Button>
            </Magnetic>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-xl border border-border
                         text-text cursor-pointer transition-colors hover:text-accent"
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="shell mt-2 overflow-hidden rounded-2xl floating shadow-float p-3 lg:hidden"
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3.5
                                 text-base text-text cursor-pointer transition-colors
                                 hover:bg-bg-tertiary hover:text-accent"
                    >
                      {link.label}
                      <Icon name="arrow-up-right" size={17} className="text-text-faint" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2 px-1 pb-1">
                <Button href="/#contact" size="lg" fullWidth>
                  Обсудить проект
                  <Icon name="arrow-right" size={16} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
