"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
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
    <footer className="relative border-t border-border bg-bg-secondary">
      <div className="shell py-14 sm:py-16">
        {/* Slogan band */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="flex flex-col items-start gap-5 border-b border-border pb-12"
        >
          <motion.h2
            variants={revealVariants("up")}
            className="font-display text-balance"
            style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}
          >
            Расправь <em>свои крылья</em>
          </motion.h2>
          <motion.a
            variants={revealVariants("up")}
            href={contact.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-accent
                       px-6 py-3.5 text-sm font-medium text-accent-ink cursor-pointer
                       transition-colors duration-300 hover:bg-accent-light"
          >
            <Icon name="telegram" size={17} />
            Написать в Telegram
            <Icon
              name="arrow-right"
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </motion.a>
        </motion.div>

        {/* Columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-accent">
                <Icon name="wing" size={15} className="text-accent-ink" />
              </span>
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
        <div className="flex flex-col gap-2 border-t border-border pt-7 text-xs
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
