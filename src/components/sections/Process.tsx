"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { processStages } from "@/data/process";

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Progress line fills as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });

  return (
    <Section id="process">
      <SectionHeading
        eyebrow="03 — Как мы работаем"
        title="Процесс без <em>чёрных ящиков</em>"
        description="Четыре стадии. На каждой вы видите, что происходит и почему."
      />

      <div ref={trackRef} className="relative mt-16">
        {/* Static rail */}
        <div
          className="absolute left-[19px] top-2 bottom-2 w-px bg-border lg:left-1/2 lg:-translate-x-1/2"
          aria-hidden="true"
        />
        {/* Animated progress fill */}
        <motion.div
          className="absolute left-[19px] top-2 w-px origin-top bg-gradient-to-b
                     from-accent to-accent-light lg:left-1/2 lg:-translate-x-1/2"
          style={{ scaleY: fill, bottom: 8 }}
          aria-hidden="true"
        />

        <motion.ol
          variants={staggerContainer(0.18)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="flex flex-col gap-12 lg:gap-20"
        >
          {processStages.map((stage, i) => {
            const flip = i % 2 === 1;
            return (
              <motion.li
                key={stage.id}
                variants={revealVariants(flip ? "left" : "right")}
                className="relative pl-14 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0"
              >
                {/* Node */}
                <span
                  className="absolute left-[11px] top-1 grid h-5 w-5 place-items-center
                             rounded-full border border-accent bg-bg lg:left-1/2 lg:-translate-x-1/2"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>

                {/* Card — alternates sides on desktop */}
                <div
                  className={
                    flip
                      ? "lg:col-start-2"
                      : "lg:col-start-1 lg:text-right"
                  }
                >
                  <div className="rounded-2xl border border-border bg-bg-secondary/40 p-7
                                  transition-colors duration-300 hover:border-accent/40">
                    <div
                      className={`mb-3 flex items-center gap-3 ${
                        !flip ? "lg:justify-end" : ""
                      }`}
                    >
                      <span className="font-display text-4xl text-accent">
                        {stage.index}
                      </span>
                      <span className="t-meta text-text-muted">
                        {stage.marker}
                      </span>
                    </div>
                    <h3 className="t-card font-display mb-2">{stage.title}</h3>
                    <p
                      className={`text-sm leading-relaxed text-text-muted ${
                        !flip ? "lg:ml-auto" : ""
                      } max-w-[42ch]`}
                    >
                      {stage.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </Section>
  );
}
