"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";

const principles = [
  {
    title: "Один контур ответственности",
    body: "Стратегия, дизайн и разработка не передаются между подрядчиками — всё держит одна команда.",
  },
  {
    title: "Продукт, а не макет",
    body: "Доводим до состояния, когда система работает в реальности, а не выглядит хорошо на слайде.",
  },
  {
    title: "Интеллект внутри процесса",
    body: "AI у нас — рабочий инструмент, встроенный в то, как мы думаем и делаем, а не витрина.",
  },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
        {/* Statement */}
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="01 — Кто мы"
            title="Команда, которая делает <em>живые</em> цифровые продукты"
          />
          <Reveal delay={0.08}>
            <p className="t-body text-text-muted">
              Мы не digital-агентство в привычном смысле и не биржа исполнителей.
              Мы — небольшая технологическая команда, которая берёт задачу
              целиком: от первой формулировки до работающего продукта в проде.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="t-body text-text-muted">
              Без презентационного тумана. Есть задача бизнеса — есть инженерное
              решение, доведённое до результата.
            </p>
          </Reveal>
        </div>

        {/* Principles */}
        <motion.ul
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="flex flex-col gap-3"
        >
          {principles.map((p, i) => (
            <motion.li
              key={p.title}
              variants={revealVariants("left")}
              className="rounded-2xl surface p-5 transition-colors duration-300
                         hover:border-border-strong"
            >
              <div className="flex items-baseline gap-3">
                <span className="t-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg">{p.title}</h3>
              </div>
              <p className="mt-2 pl-8 text-sm leading-relaxed text-text-muted">
                {p.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
