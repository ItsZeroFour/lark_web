"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Кто мы", href: "/#about" },
  { label: "Услуги", href: "/#services" },
  { label: "Процесс", href: "/#process" },
  { label: "Работы", href: "/#portfolio" },
  { label: "Команда", href: "/#team" },
  { label: "Larkins", href: "/larkins" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Glass treatment kicks in after a short scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "shell flex items-center justify-between rounded-full",
          "transition-[background,border-color,box-shadow] duration-400 ease-cinematic",
          "h-16 !px-4 sm:!px-6",
          scrolled
            ? "glass border border-border shadow-elevated"
            : "border border-transparent bg-transparent",
        )}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 cursor-pointer"
          aria-label="Lark Freelance — на главную"
          onClick={() => setOpen(false)}
        >
          <LarkMark />
          <span className="font-display text-xl tracking-tight">
            Lark<span className="amber"> Freelance</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-text-muted
                           transition-colors duration-200 hover:text-text cursor-pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button href="/#contact" variant="primary" className="!px-5 !py-2.5 !min-h-0">
            Обсудить проект
            <Icon name="arrow-right" size={16} />
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-border
                       bg-bg-secondary/50 text-text cursor-pointer
                       transition-colors hover:text-accent"
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="shell mt-3 overflow-hidden rounded-3xl glass border border-border
                       p-4 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-border
                               px-2 py-4 text-lg text-text cursor-pointer
                               transition-colors hover:text-accent"
                  >
                    {link.label}
                    <Icon name="arrow-up-right" size={18} />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="pt-4">
              <Button
                href="/#contact"
                variant="primary"
                fullWidth
                magnetic={false}
              >
                Обсудить проект
                <Icon name="arrow-right" size={16} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Compact lark glyph used in the wordmark. */
function LarkMark() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-xl border border-accent/40 bg-bg-secondary/60">
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 18c6 0 10-3.2 12-9.6C17.2 12.8 19.6 15 23 15c-4.4 2.2-7.6 5.4-9.6 9.6C12.2 20.2 8.4 18 4 18Z"
          fill="var(--accent)"
        />
      </svg>
    </span>
  );
}
