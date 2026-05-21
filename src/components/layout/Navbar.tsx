"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Услуги", href: "/#services" },
  { label: "Процесс", href: "/#process" },
  { label: "Работы", href: "/#portfolio" },
  { label: "Команда", href: "/#team" },
  { label: "Larkins", href: "/larkins" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={cn(
          "shell flex h-14 items-center justify-between rounded-2xl !px-3 sm:h-16 sm:!px-5",
          "transition-[background-color,border-color,box-shadow] duration-300 ease-cinematic",
          scrolled || open
            ? "floating shadow-float"
            : "border border-transparent",
        )}
      >
        {/* Wordmark */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Lark Freelance — на главную"
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent">
            <Icon name="wing" size={17} className="text-accent-ink" />
          </span>
          <span className="font-display text-lg tracking-tight">
            Lark<span className="text-text-muted"> Freelance</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-text-muted
                           transition-colors duration-200 hover:text-text cursor-pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button href="/#contact">
            Обсудить проект
            <Icon name="arrow-right" size={15} />
          </Button>
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
  );
}
