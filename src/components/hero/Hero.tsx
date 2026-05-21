"use client";

import { motion } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { revealVariants, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";

const stats = [
  { value: "4", label: "человека в команде" },
  { value: "AI", label: "native-процессы" },
  { value: "1 час", label: "до первого ответа" },
];

const capabilities = [
  "Web Development",
  "AI Automation",
  "IT под ключ",
  "Дизайн-системы",
  "Продуктовая стратегия",
  "Интеграции",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] flex-col justify-center pt-28 pb-12 sm:pt-32"
    >
      <HeroBackground />

      <div className="shell flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer(0.09, 0.05)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.span
            variants={revealVariants("up")}
            className="inline-flex items-center gap-2 rounded-full border border-border
                       bg-bg-secondary px-3.5 py-1.5 t-meta text-text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            IT-агентство нового поколения
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={revealVariants("up")}
            className="font-display t-hero text-balance mt-6 max-w-[16ch]"
          >
            Цифровые решения, которые <em>работают</em>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={revealVariants("up")}
            className="t-lead text-text-muted text-pretty mt-6"
          >
            Стратегия, дизайн и AI-execution в одной команде.
            Для бизнеса, который думает вперёд.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={revealVariants("up")}
            className="mt-9 flex w-full flex-col gap-3 xs:w-auto xs:flex-row xs:items-center"
          >
            <Button href="#contact" variant="primary" size="lg">
              Обсудить проект
              <Icon
                name="arrow-right"
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Button>
            <Button href="#portfolio" variant="secondary" size="lg">
              Смотреть работы
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            variants={revealVariants("up")}
            className="mt-5 flex items-center gap-2 text-sm text-text-faint"
          >
            <Icon name="telegram" size={15} className="text-accent" />
            Ответим в Telegram {contact.responseTime}
          </motion.p>

          {/* Stats */}
          <motion.dl
            variants={revealVariants("up")}
            className="mt-12 grid w-full max-w-md grid-cols-3 gap-px overflow-hidden
                       rounded-2xl border border-border bg-border"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 bg-bg px-3 py-5"
              >
                <dt className="font-display text-xl amber xs:text-2xl sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="text-center text-[0.68rem] leading-tight text-text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Capability marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mask-x relative mt-14 flex overflow-hidden border-y border-border py-3.5"
      >
        <div className="anim-marquee flex shrink-0 items-center">
          {[...capabilities, ...capabilities].map((cap, i) => (
            <span
              key={i}
              className="flex items-center gap-6 whitespace-nowrap px-6 t-meta text-text-faint"
            >
              {cap}
              <span className="h-1 w-1 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
