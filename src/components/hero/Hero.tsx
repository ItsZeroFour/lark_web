"use client";

import { motion } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { HeroOrb } from "./HeroOrb";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { revealVariants, staggerContainer } from "@/hooks/useReveal";

const stats = [
  { value: "4", label: "execution unit" },
  { value: "AI", label: "native процессы" },
  { value: "1ч", label: "до первого ответа" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center pt-28 pb-16 lg:pt-32"
    >
      <HeroBackground />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — message */}
        <motion.div
          variants={staggerContainer(0.13, 0.1)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-7"
        >
          <motion.span
            variants={revealVariants("up")}
            className="inline-flex items-center gap-2.5 rounded-full border border-border
                       bg-bg-secondary/50 px-4 py-2 t-meta text-text-muted"
          >
            <Icon name="spark" size={13} className="text-accent" />
            IT-агентство нового поколения
          </motion.span>

          <motion.h1
            variants={revealVariants("up")}
            className="font-display text-balance"
            style={{ fontSize: "clamp(2.7rem, 6.6vw, 5.4rem)" }}
          >
            Цифровые решения,
            <br />
            которые <em>работают.</em>
          </motion.h1>

          <motion.p
            variants={revealVariants("up")}
            className="t-lead text-text-muted"
          >
            Стратегия, дизайн и AI-execution в одной команде.
            Для бизнеса, который думает вперёд.
          </motion.p>

          <motion.div
            variants={revealVariants("up")}
            className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center"
          >
            <Button href="/#contact" variant="primary">
              Обсудить проект
              <Icon name="arrow-right" size={16} />
            </Button>
            <Button href="/#portfolio" variant="secondary" magnetic={false}>
              Смотреть работы
            </Button>
          </motion.div>

          {/* Quiet stat row */}
          <motion.dl
            variants={revealVariants("up")}
            className="mt-4 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-7"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="font-display text-3xl amber">{s.value}</dt>
                <dd className="t-meta text-text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Right — living AI core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <HeroOrb />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="t-meta text-text-muted">scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}
