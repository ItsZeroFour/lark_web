"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Glow } from "@/components/ui/Glow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Magnetic } from "@/components/ui/Magnetic";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";

const footerNav = [
  {
    title: "Агентство",
    links: [
      { label: "Кто мы", href: "/#about" },
      { label: "Услуги", href: "/#services" },
      { label: "Процесс", href: "/#process" },
      { label: "Работы", href: "/#portfolio" },
    ],
  },
  {
    title: "Ещё",
    links: [
      { label: "Команда", href: "/#team" },
      { label: "Larkins AI", href: "/larkins" },
      { label: "Для фрилансеров", href: "/#freelancers" },
      { label: "Вопросы", href: "/#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-secondary">
      <GridBackdrop variant="lines" fade="top" className="z-0" />
      <Glow
        className="z-0 -top-32 left-1/2 -translate-x-1/2 opacity-70"
        size={620}
      />

      <div className="shell relative z-10">
        {/* Closing screen */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="relative flex flex-col items-center gap-6 border-b border-border
                     py-20 text-center sm:py-28"
        >
          {/* Giant brandmark watermark */}
          <Logo
            size={400}
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10
                       -translate-x-1/2 -translate-y-1/2 text-accent opacity-[0.05]"
          />

          <motion.span
            variants={revealVariants("up")}
            className="t-meta flex items-center gap-2.5 text-text-muted"
          >
            <span className="inline-block h-px w-7 bg-gradient-to-r from-transparent to-accent" />
            AI-native execution unit
            <span className="inline-block h-px w-7 bg-gradient-to-l from-transparent to-accent" />
          </motion.span>

          <motion.h2
            variants={revealVariants("up")}
            className="font-display text-balance"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 5rem)" }}
          >
            Расправь <em>свои крылья</em>
          </motion.h2>

          <motion.p
            variants={revealVariants("up")}
            className="t-lead text-text-muted text-pretty"
          >
            Расскажите о задаче — соберём решение, назовём сроки и ответим
            в течение часа.
          </motion.p>

          <motion.div variants={revealVariants("up")} className="mt-2">
            <Magnetic>
              <a
                href={contact.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent
                           px-7 py-4 text-sm font-medium text-accent-ink cursor-pointer
                           transition-colors duration-300 hover:bg-accent-light"
              >
                <Icon name="telegram" size={18} />
                Написать в Telegram
                <Icon
                  name="arrow-right"
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Logo size={26} className="text-accent" />
              <span className="font-display text-base">Lark Freelance</span>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              AI-native execution unit. Стратегия, дизайн и разработка
              в одном контуре.
            </p>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <span className="t-meta text-text-faint">{col.title}</span>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-text-muted
                                 transition-colors duration-200 hover:text-accent cursor-pointer"
                    >
                      <span
                        className="h-px w-0 bg-accent transition-all duration-300
                                   group-hover:w-3"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="t-meta text-text-faint">Контакт</span>
            <a
              href={contact.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-muted
                         transition-colors hover:text-accent cursor-pointer"
            >
              <Icon name="telegram" size={15} />
              {contact.telegram.handle}
            </a>
            <a
              href={contact.phone.href}
              className="flex items-center gap-2 text-sm text-text-muted
                         transition-colors hover:text-accent cursor-pointer"
            >
              <Icon name="phone" size={15} />
              {contact.phone.label}
            </a>
            <a
              href={contact.email.href}
              className="flex items-center gap-2 text-sm text-text-muted
                         transition-colors hover:text-accent cursor-pointer"
            >
              <Icon name="mail" size={15} />
              {contact.email.label}
            </a>
            <span className="text-sm text-text-faint">{contact.location}</span>
          </div>
        </div>

        {/* Baseline */}
        <div className="flex flex-col gap-2 border-t border-border pt-7 pb-10 text-xs
                        text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <span className="t-mono">
            © {new Date().getFullYear()} Lark Freelance
          </span>
          <span className="t-mono">Private tech unit · Крым</span>
        </div>
      </div>
    </footer>
  );
}
