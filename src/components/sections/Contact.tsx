"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Glow } from "@/components/ui/Glow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";

interface Channel {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  primary?: boolean;
  note: string;
}

const channels: Channel[] = [
  {
    icon: "telegram",
    label: "Telegram",
    value: contact.telegram.handle,
    href: contact.telegram.url,
    external: true,
    primary: true,
    note: "Самый быстрый способ — ответим в течение часа",
  },
  {
    icon: "phone",
    label: "Телефон",
    value: contact.phone.label,
    href: contact.phone.href,
    note: "Звонок в рабочее время",
  },
  {
    icon: "mail",
    label: "Почта",
    value: contact.email.label,
    href: contact.email.href,
    note: "Для подробных задач и документов",
  },
];

export function Contact() {
  return (
    <Section id="contact" divided className="overflow-hidden">
      <Glow className="-top-20 right-0" size={520} />

      <div className="grid gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        {/* Pitch */}
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="flex flex-col gap-5"
        >
          <motion.span
            variants={revealVariants("up")}
            className="t-meta flex items-center gap-2.5 text-text-muted"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping
                               rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span
              className="inline-block h-px w-7 bg-gradient-to-r from-accent to-transparent"
              aria-hidden="true"
            />
            08 — Контакты
          </motion.span>
          <motion.h2
            variants={revealVariants("up")}
            className="font-display t-section text-balance max-w-[14ch]"
          >
            Обсудим <em>ваш проект</em>
          </motion.h2>
          <motion.p
            variants={revealVariants("up")}
            className="t-lead text-text-muted text-pretty"
          >
            Расскажите задачу — мы предложим решение, назовём сроки и вилку
            стоимости. Без обязательств и долгих форм.
          </motion.p>

          <motion.div
            variants={revealVariants("up")}
            className="mt-1 flex flex-col gap-3 rounded-2xl surface p-5"
          >
            {[
              { icon: "clock" as IconName, text: `Первый ответ ${contact.responseTime}` },
              { icon: "shield" as IconName, text: "Бриф ни к чему не обязывает" },
              { icon: "spark" as IconName, text: "Можно собрать бриф через Larkins выше" },
            ].map((row) => (
              <div key={row.text} className="flex items-center gap-3 text-sm">
                <Icon name={row.icon} size={17} className="shrink-0 text-accent" />
                <span className="text-text-muted">{row.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Channels */}
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="flex flex-col gap-3"
        >
          {channels.map((ch) => (
            <motion.a
              key={ch.label}
              variants={revealVariants("left")}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              href={ch.href}
              {...(ch.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...(ch.icon === "telegram" ? { "data-magnet": "telegram" } : {})}
              className={cnChannel(ch.primary)}
            >
              <span
                className={
                  ch.primary
                    ? "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-ink/15 text-accent-ink"
                    : "grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-bg text-accent"
                }
              >
                <Icon name={ch.icon} size={22} />
              </span>
              <span className="flex min-w-0 flex-col">
                <span
                  className={
                    ch.primary
                      ? "t-meta text-[0.62rem] text-accent-ink/70"
                      : "t-meta text-[0.62rem] text-text-faint"
                  }
                >
                  {ch.label}
                </span>
                <span className="truncate text-base font-medium">{ch.value}</span>
                <span
                  className={
                    ch.primary
                      ? "text-xs text-accent-ink/70"
                      : "text-xs text-text-muted"
                  }
                >
                  {ch.note}
                </span>
              </span>
              <Icon
                name="arrow-up-right"
                size={20}
                className="ml-auto shrink-0 transition-transform duration-300
                           group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          ))}

          <motion.p
            variants={revealVariants("up")}
            className="px-1 pt-1 text-xs text-text-faint"
          >
            {contact.location}
          </motion.p>
        </motion.div>
      </div>
    </Section>
  );
}

/** Channel card classes — the primary (Telegram) card is amber-filled. */
function cnChannel(primary?: boolean): string {
  const base =
    "group flex items-center gap-4 rounded-2xl p-4 sm:p-5 cursor-pointer " +
    "transition-[background-color,border-color,box-shadow] duration-300";
  return primary
    ? `${base} bg-accent text-accent-ink hover:bg-accent-light hover:shadow-lift`
    : `${base} surface hover:border-border-strong`;
}
