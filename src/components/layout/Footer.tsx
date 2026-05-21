"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { Glow } from "@/components/ui/Glow";
import { Icon } from "@/components/ui/Icon";

const footerNav = [
  {
    title: "Навигация",
    links: [
      { label: "Кто мы", href: "/#about" },
      { label: "Услуги", href: "/#services" },
      { label: "Процесс", href: "/#process" },
      { label: "Работы", href: "/#portfolio" },
    ],
  },
  {
    title: "Команда",
    links: [
      { label: "О команде", href: "/#team" },
      { label: "Larkins AI", href: "/larkins" },
      { label: "Для фрилансеров", href: "/#freelancers" },
      { label: "Обсудить проект", href: "/#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-secondary/40">
      <Glow className="-bottom-40 left-1/2 -translate-x-1/2" size={620} />
      <div className="grid-field mask-radial absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="shell relative py-20">
        {/* Slogan band */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="flex flex-col items-start gap-6 border-b border-border pb-16"
        >
          <motion.span
            variants={revealVariants("up")}
            className="t-meta text-text-muted"
          >
            Lark Freelance
          </motion.span>
          <motion.h2
            variants={revealVariants("up")}
            className="font-display text-balance"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.6rem)" }}
          >
            Расправь <em>свои крылья</em>
          </motion.h2>
          <motion.div variants={revealVariants("up")}>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-border
                         bg-bg px-6 py-3.5 text-sm cursor-pointer
                         transition-colors duration-300 hover:border-accent/60 hover:text-accent"
            >
              Начать диалог с командой
              <Icon
                name="arrow-right"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Link columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Icon name="wing" size={22} className="text-accent" />
              <span className="font-display text-lg">Lark Freelance</span>
            </div>
            <p className="t-body text-sm text-text-muted">
              AI-native execution unit. Стратегия, дизайн и разработка
              в одной команде нового поколения.
            </p>
          </div>

          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-4">
              <span className="t-meta text-text-muted">{col.title}</span>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors
                                 duration-200 hover:text-accent cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-4">
            <span className="t-meta text-text-muted">Контакт</span>
            <a
              href="mailto:hello@larkfreelance.dev"
              className="t-mono text-sm text-text transition-colors hover:text-accent cursor-pointer"
            >
              hello@larkfreelance.dev
            </a>
            <span className="text-sm text-text-muted">
              Крым · работаем удалённо
            </span>
          </div>
        </div>

        {/* Baseline */}
        <div className="flex flex-col gap-3 border-t border-border pt-8 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="t-mono">
            © {new Date().getFullYear()} Lark Freelance. Все права защищены.
          </span>
          <span className="t-mono">
            Designed &amp; engineered as a private tech unit.
          </span>
        </div>
      </div>
    </footer>
  );
}
