"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Glow } from "@/components/ui/Glow";
import { AmbientMotion } from "@/components/animations/AmbientMotion";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";

const offers = [
  {
    title: "Отбор, а не поток",
    body: "Мы зовём точечно. Маленькая команда сильных людей важнее большой случайной.",
  },
  {
    title: "Среда роста",
    body: "Сложные задачи, AI-инструменты и люди, у которых есть чему учиться.",
  },
  {
    title: "Своя орбита",
    body: "Прозрачные условия, уважение ко времени и доля ответственности за результат.",
  },
];

export function Freelancers() {
  return (
    <Section id="freelancers" contained={false}>
      <div className="shell relative">
        <div className="relative overflow-hidden rounded-3xl border border-border
                        bg-bg-secondary/50 px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
          {/* Atmosphere — distinct from the rest of the page */}
          <div className="grid-field mask-radial absolute inset-0 opacity-70" aria-hidden="true" />
          <AmbientMotion count={18} />
          <Glow className="-top-24 left-1/2 -translate-x-1/2" size={560} pulse />

          <motion.div
            variants={staggerContainer(0.13)}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="relative flex flex-col items-center gap-7 text-center"
          >
            <motion.span
              variants={revealVariants("up")}
              className="inline-flex items-center gap-2 rounded-full border border-accent/40
                         bg-bg/60 px-4 py-2 t-meta text-accent"
            >
              <Icon name="wing" size={14} />
              Private invitation
            </motion.span>

            <motion.h2
              variants={revealVariants("up")}
              className="font-display text-balance"
              style={{ fontSize: "clamp(2.2rem, 5.4vw, 4.2rem)" }}
            >
              Летим <em>вместе</em>
            </motion.h2>

            <motion.p
              variants={revealVariants("up")}
              className="t-lead mx-auto text-text-muted"
            >
              Lark — это не биржа исполнителей. Это закрытый круг людей,
              которые умеют доводить до результата. Если вы из таких —
              в команде есть место рядом.
            </motion.p>

            {/* Offer cards */}
            <motion.ul
              variants={staggerContainer(0.1)}
              className="mt-6 grid w-full gap-4 text-left sm:grid-cols-3"
            >
              {offers.map((o) => (
                <motion.li
                  key={o.title}
                  variants={revealVariants("up")}
                  className="rounded-2xl border border-border bg-bg/50 p-6
                             transition-colors duration-300 hover:border-accent/40"
                >
                  <h3 className="font-display text-lg">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {o.body}
                  </p>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={revealVariants("up")} className="pt-3">
              <Button href="mailto:join@larkfreelance.dev" external>
                Отправить заявку
                <Icon name="arrow-up-right" size={16} />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
