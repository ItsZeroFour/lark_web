"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Glow } from "@/components/ui/Glow";
import { Icon } from "@/components/ui/Icon";
import { revealVariants, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";

const traits = [
  {
    title: "Собирает бриф",
    body: "Пять точных вопросов вместо длинной формы — задача оформляется сама.",
  },
  {
    title: "Думает с командой",
    body: "Интеллектуальный слой внутри процессов агентства, а не отдельный чат-бот.",
  },
  {
    title: "Передаёт задачу",
    body: "Готовое саммари сразу уходит команде — ответ в течение часа.",
  },
];

export function LarkinsStage() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden py-32">
      <Glow className="left-1/2 top-24 -translate-x-1/2" size={620} />

      <div className="shell relative">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={revealVariants("up")}
            className="inline-flex items-center gap-2 rounded-full border border-accent/40
                       bg-accent-soft px-3.5 py-1.5 t-meta text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            coming soon
          </motion.span>

          <motion.h1
            variants={revealVariants("up")}
            className="font-display mt-6 leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 14vw, 8.5rem)" }}
          >
            Larkins
          </motion.h1>

          <motion.p
            variants={revealVariants("up")}
            className="t-meta mt-4 text-text-faint"
          >
            Lark Freelance · intelligence layer
          </motion.p>

          <motion.p
            variants={revealVariants("up")}
            className="t-lead text-pretty mt-7 text-text-muted"
          >
            AI-ассистент нового поколения для вашего бизнеса. Спокойный
            интеллект, встроенный в работу команды.
          </motion.p>

          {/* Traits */}
          <motion.ul
            variants={staggerContainer(0.08)}
            className="mt-12 grid w-full gap-3 text-left sm:grid-cols-3"
          >
            {traits.map((t) => (
              <motion.li
                key={t.title}
                variants={revealVariants("up")}
                className="rounded-2xl surface p-5"
              >
                <h2 className="font-display text-base">{t.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {t.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          {/* Actions */}
          <motion.div
            variants={revealVariants("up")}
            className="mt-11 flex w-full flex-col gap-3 xs:w-auto xs:flex-row"
          >
            <Link
              href="/#larkins-brief"
              className="group inline-flex items-center justify-center gap-2 rounded-full
                         bg-accent px-7 py-3.5 text-sm font-medium text-accent-ink
                         cursor-pointer transition-colors duration-300 hover:bg-accent-light"
            >
              Собрать бриф сейчас
              <Icon
                name="arrow-right"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href={contact.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full
                         border border-border-strong px-7 py-3.5 text-sm font-medium
                         cursor-pointer transition-colors duration-300
                         hover:border-accent hover:text-accent"
            >
              <Icon name="telegram" size={16} />
              Написать в Telegram
            </a>
          </motion.div>

          <motion.div variants={revealVariants("up")} className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-faint
                         transition-colors hover:text-text cursor-pointer"
            >
              <Icon name="arrow-right" size={15} className="rotate-180" />
              На главную
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
