"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow } from "@/components/ui/Glow";
import { Reveal } from "@/components/animations/Reveal";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";

const principles = [
  {
    title: "Один контур ответственности",
    body: "Стратегия, дизайн и разработка не передаются между подрядчиками. Всё держит одна команда.",
  },
  {
    title: "Продукт, а не макет",
    body: "Мы доводим до состояния, когда система работает в реальности, а не выглядит хорошо на презентации.",
  },
  {
    title: "Интеллект внутри процесса",
    body: "AI у нас — не витрина. Это рабочий инструмент, встроенный в то, как мы думаем и делаем.",
  },
];

export function About() {
  return (
    <Section id="about">
      <Glow className="-top-20 right-0" size={460} />

      <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        {/* Statement */}
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="01 — Кто мы"
            title="Единственная команда в&nbsp;Крыму, которая делает <em>живые</em> цифровые продукты"
          />
          <Reveal delay={0.1}>
            <p className="t-body text-text-muted">
              Мы не digital-агентство в привычном смысле и не биржа исполнителей.
              Мы — небольшая технологическая команда, которая берёт задачу
              целиком: от первой формулировки до работающего продукта в проде.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="t-body text-text-muted">
              Без презентационного тумана и обещаний. Есть задача бизнеса —
              есть инженерное решение, доведённое до результата.
            </p>
          </Reveal>
        </div>

        {/* Principles */}
        <motion.ul
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="flex flex-col gap-4"
        >
          {principles.map((p, i) => (
            <motion.li
              key={p.title}
              variants={revealVariants("left")}
              className="group relative rounded-2xl border border-border bg-bg-secondary/40
                         p-6 transition-colors duration-300 hover:border-accent/40"
            >
              <span className="t-mono mb-3 block text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-card font-display mb-2">{p.title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{p.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
