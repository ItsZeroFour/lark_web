"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow } from "@/components/ui/Glow";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { team } from "@/data/team";

export function Team() {
  return (
    <Section id="team" divided>
      {/* Quiet ambient warmth — one soft glow, never distracting */}
      <Glow className="-top-16 left-1/4 opacity-50" size={520} />

      <SectionHeading
        eyebrow="05 — Команда"
        title="Четыре человека — <em>ядро</em> команды"
        description="Это ядро команды. Вокруг него под каждый проект собирается сеть проверенных специалистов."
      />

      <motion.ul
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="mt-10 grid items-stretch gap-4 xs:grid-cols-2 lg:grid-cols-4"
      >
        {team.map((member) => (
          <motion.li
            key={member.id}
            variants={revealVariants("up")}
            className="group/card relative flex h-full flex-col overflow-hidden
                       rounded-2xl surface p-5 transition-colors duration-300
                       hover:border-border-strong"
          >
            {/* Hover accent line along the top edge */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px
                         bg-gradient-to-r from-transparent via-accent to-transparent
                         opacity-0 transition-opacity duration-300
                         group-hover/card:opacity-70"
            />

            {/* Monogram plate */}
            <div className="flex items-center justify-between">
              <span
                className="grid h-14 w-14 place-items-center rounded-xl border border-border
                           bg-bg-tertiary font-display text-xl text-text-muted
                           transition-colors duration-300 group-hover/card:border-accent/40
                           group-hover/card:text-accent"
              >
                {member.monogram}
              </span>
              <span
                className="h-2 w-2 rounded-full bg-accent
                           transition-shadow duration-300
                           group-hover/card:shadow-[0_0_12px_2px_rgba(212,160,23,0.35)]"
                aria-hidden="true"
              />
            </div>

            <h3 className="mt-5 font-display text-lg">{member.name}</h3>
            {/* Fixed height keeps the divider on one line across every card */}
            <p className="mt-1 flex min-h-[2.75rem] items-start text-sm text-accent">
              {member.caption}
            </p>
            {/* Starts right after the fixed-height caption — divider stays on one line */}
            <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-text-muted">
              {member.trait}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
