"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow } from "@/components/ui/Glow";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { team } from "@/data/team";

export function Team() {
  return (
    <Section id="team">
      <Glow className="-top-10 left-[-6%]" size={420} />

      <SectionHeading
        eyebrow="05 — Команда"
        title="Четыре человека. <em>Один</em> образ мышления"
        description="Мы описываем людей не должностями, а тем, как они думают."
      />

      <motion.ul
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {team.map((member) => (
          <motion.li
            key={member.id}
            variants={revealVariants("up")}
            className="group relative overflow-hidden rounded-2xl border border-border
                       bg-bg-secondary/40 p-7 transition-colors duration-300
                       hover:border-accent/45"
          >
            {/* Avatar plate */}
            <div className="relative mb-6">
              <div
                className="grid aspect-square w-full place-items-center rounded-xl
                           border border-border"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, var(--bg-tertiary), var(--bg))",
                }}
              >
                <span className="font-display text-5xl text-text-muted
                                 transition-colors duration-300 group-hover:text-accent">
                  {member.monogram}
                </span>
                <div className="grid-field absolute inset-0 rounded-xl opacity-40" />
              </div>
              {/* Online dot */}
              <span
                className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-accent
                           shadow-glow-sm"
                aria-hidden="true"
              />
            </div>

            <h3 className="font-display text-xl">{member.name}</h3>
            <p className="mt-1 text-sm text-accent">{member.caption}</p>

            {/* Trait — revealed on hover, height-stable */}
            <p
              className="mt-3 text-sm leading-relaxed text-text-muted opacity-0
                         transition-opacity duration-300 group-hover:opacity-100"
            >
              {member.trait}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
