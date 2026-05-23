"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow } from "@/components/ui/Glow";
import { Spotlight } from "@/components/ui/Spotlight";
import { Icon } from "@/components/ui/Icon";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { team } from "@/data/team";

export function Team() {
  return (
    <Section id="team" divided>
      {/* One quiet ambient warmth — never distracting */}
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
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={
              {
                "--member": member.accent,
                "--spotlight": `color-mix(in srgb, ${member.accent} 20%, transparent)`,
              } as CSSProperties
            }
            className="group/card relative overflow-hidden rounded-2xl surface
                       transition-[border-color,box-shadow] duration-300 ease-cinematic
                       hover:border-border-strong hover:shadow-lift"
          >
            <Spotlight />

            {/* Hover accent line along the top edge */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px opacity-0
                         transition-opacity duration-300 group-hover/card:opacity-80"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--member), transparent)",
              }}
            />

            <div className="relative z-[1] flex h-full flex-col">
              {/* Portrait — photo placeholder until real images land */}
              <div
                className="relative aspect-[4/5] overflow-hidden border-b border-border"
                style={{
                  background:
                    "linear-gradient(155deg, color-mix(in srgb, var(--member) 24%, var(--bg-tertiary)), var(--bg))",
                }}
              >
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo}
                    alt={`${member.name} — ${member.caption}`}
                    className="h-full w-full object-cover transition-transform
                               duration-500 ease-cinematic group-hover/card:scale-[1.04]"
                  />
                ) : (
                  <>
                    {/* Silhouette stand-in */}
                    <span
                      className="absolute inset-0 grid place-items-center
                                 transition-transform duration-500 ease-cinematic
                                 group-hover/card:scale-[1.05]"
                    >
                      <Icon
                        name="user"
                        size={68}
                        style={{
                          color:
                            "color-mix(in srgb, var(--member) 55%, transparent)",
                        }}
                      />
                    </span>
                    {/* Placeholder caption */}
                    <span
                      className="t-meta absolute inset-x-0 bottom-3 text-center
                                 text-[0.58rem] text-text-faint"
                    >
                      фото скоро
                    </span>
                  </>
                )}

                {/* Monogram badge */}
                <span
                  className="absolute left-3 top-3 grid h-9 w-9 place-items-center
                             rounded-lg border font-display text-sm"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--member) 40%, var(--border))",
                    background:
                      "color-mix(in srgb, var(--member) 18%, var(--surface))",
                    color: "var(--member)",
                  }}
                >
                  {member.monogram}
                </span>

                {/* Live dot */}
                <span
                  className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: "var(--member)",
                    boxShadow:
                      "0 0 10px 1px color-mix(in srgb, var(--member) 60%, transparent)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg">{member.name}</h3>
                {/* Fixed height keeps the divider on one line across every card */}
                <p
                  className="mt-1 flex min-h-[2.75rem] items-start text-sm font-medium"
                  style={{ color: "var(--member)" }}
                >
                  {member.caption}
                </p>
                {/* Divider stays on one line right after the fixed-height caption */}
                <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-text-muted">
                  {member.trait}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
