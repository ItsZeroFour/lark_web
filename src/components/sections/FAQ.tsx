"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { faq } from "@/data/faq";

export function FAQ() {
  // First item open by default — gives the section immediate substance.
  const [open, setOpen] = useState<number>(0);

  return (
    <Section id="faq" divided>
      <SectionHeading
        eyebrow="07 — Вопросы"
        title="Коротко о <em>главном</em>"
        description="Если остались вопросы — спросите напрямую в Telegram."
      />

      <motion.ul
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="mx-auto mt-9 flex max-w-3xl flex-col gap-2.5"
      >
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.li
              key={item.q}
              variants={revealVariants("up")}
              className="rounded-2xl surface transition-colors duration-300"
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left cursor-pointer"
                >
                  <span className="flex-1 font-medium">{item.q}</span>
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg
                               border border-border text-accent transition-colors duration-200"
                  >
                    <Icon name={isOpen ? "minus" : "plus"} size={16} />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
}
