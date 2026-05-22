"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spotlight } from "@/components/ui/Spotlight";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { processStages } from "@/data/process";

export function Process() {
  const trackRef = useRef<HTMLOListElement>(null);

  // Progress line fills as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 0.6,
  });

  return (
    <Section id="process" divided>
      <SectionHeading
        eyebrow="03 — Как мы работаем"
        title="Процесс без <em>чёрных ящиков</em>"
        description="Четыре стадии. На каждой видно, что происходит и почему."
      />

      <motion.ol
        ref={trackRef}
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="relative mt-10 flex flex-col gap-6 sm:gap-8"
      >
        {/* Rail */}
        <div
          className="absolute left-[15px] top-3 bottom-3 w-px bg-border"
          aria-hidden="true"
        />
        <motion.div
          className="absolute left-[15px] top-3 w-px origin-top bg-accent"
          style={{ scaleY: fill, bottom: 12 }}
          aria-hidden="true"
        />

        {processStages.map((stage) => (
          <motion.li
            key={stage.id}
            variants={revealVariants("up")}
            className="relative pl-12"
          >
            {/* Node */}
            <span
              className="absolute left-[7px] top-1.5 grid h-[18px] w-[18px] place-items-center
                         rounded-full border border-accent bg-bg
                         shadow-[0_0_12px_2px_rgba(212,160,23,0.25)]"
              aria-hidden="true"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>

            <div className="group relative overflow-hidden rounded-2xl surface
                            transition-[border-color,box-shadow,transform] duration-300
                            ease-cinematic hover:-translate-y-1 hover:border-border-strong
                            hover:shadow-lift">
              <Spotlight />
              <div className="relative z-[1] p-5 sm:p-6">
                <div className="mb-2 flex items-baseline gap-3">
                  <span className="font-display text-3xl text-accent">
                    {stage.index}
                  </span>
                  <h3 className="t-card font-display">{stage.title}</h3>
                  <span className="t-meta ml-auto hidden text-text-faint sm:block">
                    {stage.marker}
                  </span>
                </div>
                <p className="max-w-[52ch] text-sm leading-relaxed text-text-muted">
                  {stage.description}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
