"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";

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
    <Section id="freelancers" divided>
      <div className="overflow-hidden rounded-3xl border border-border bg-bg-secondary
                      px-5 py-12 sm:px-10 sm:py-14 lg:px-14">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="flex flex-col items-center gap-5 text-center"
        >
          <motion.span
            variants={revealVariants("up")}
            className="inline-flex items-center gap-2 rounded-full border border-accent/40
                       bg-accent-soft px-3 py-1.5 t-meta text-accent"
          >
            <Icon name="wing" size={13} />
            Для фрилансеров
          </motion.span>

          <motion.h2
            variants={revealVariants("up")}
            className="font-display text-balance"
            style={{ fontSize: "clamp(1.9rem, 5vw, 3.4rem)" }}
          >
            Летим <em>вместе</em>
          </motion.h2>

          <motion.p
            variants={revealVariants("up")}
            className="t-lead text-text-muted text-pretty"
          >
            Lark — не биржа исполнителей. Это закрытый круг людей, которые
            умеют доводить до результата. Если вы из таких — в команде есть
            место рядом.
          </motion.p>

          <motion.ul
            variants={staggerContainer(0.08)}
            className="mt-4 grid w-full gap-3 text-left sm:grid-cols-3"
          >
            {offers.map((o) => (
              <motion.li
                key={o.title}
                variants={revealVariants("up")}
                className="rounded-2xl surface p-5 transition-colors duration-300
                           hover:border-border-strong"
              >
                <h3 className="font-display text-base">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {o.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={revealVariants("up")} className="mt-3">
            <Button href={contact.joinEmail.href} external variant="secondary" size="lg">
              Отправить заявку
              <Icon name="arrow-up-right" size={16} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
