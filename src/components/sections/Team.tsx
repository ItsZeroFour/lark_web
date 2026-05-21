"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { team } from "@/data/team";

export function Team() {
  return (
    <Section id="team" divided>
      <SectionHeading
        eyebrow="05 — Команда"
        title="Четыре человека. <em>Один</em> образ мышления"
        description="Мы описываем людей не должностями, а тем, как они думают."
      />

      <motion.ul
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="mt-10 grid gap-4 xs:grid-cols-2 lg:grid-cols-4"
      >
        {team.map((member) => (
          <motion.li
            key={member.id}
            variants={revealVariants("up")}
            className="group rounded-2xl surface p-5 transition-colors duration-300
                       hover:border-border-strong"
          >
            {/* Monogram plate */}
            <div className="flex items-center justify-between">
              <span
                className="grid h-14 w-14 place-items-center rounded-xl border border-border
                           bg-bg-tertiary font-display text-xl text-text-muted
                           transition-colors duration-300 group-hover:text-accent"
              >
                {member.monogram}
              </span>
              <span
                className="h-2 w-2 rounded-full bg-accent"
                aria-hidden="true"
              />
            </div>

            <h3 className="mt-5 font-display text-lg">{member.name}</h3>
            <p className="mt-1 text-sm text-accent">{member.caption}</p>
            <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-text-muted">
              {member.trait}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
