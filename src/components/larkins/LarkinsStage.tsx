"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AmbientMotion } from "@/components/animations/AmbientMotion";
import { Icon } from "@/components/ui/Icon";
import { revealVariants, staggerContainer } from "@/hooks/useReveal";

/**
 * /larkins — a full-screen cinematic experience.
 * Almost-black canvas, a sleeping AI orb, ambient motion, "coming soon".
 */
export function LarkinsStage() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-32">
      {/* Deepened canvas */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 42%, var(--halo) 0%, transparent 62%)",
        }}
      />
      <div className="grid-field mask-radial absolute inset-0 opacity-50" aria-hidden="true" />
      <AmbientMotion count={22} />

      <motion.div
        variants={staggerContainer(0.16, 0.1)}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center gap-9 text-center"
      >
        {/* Sleeping orb */}
        <motion.div variants={revealVariants("fade")}>
          <SleepingOrb />
        </motion.div>

        <motion.span
          variants={revealVariants("up")}
          className="t-meta text-text-muted"
        >
          Lark Freelance · intelligence layer
        </motion.span>

        <motion.h1
          variants={revealVariants("up")}
          className="font-display leading-none tracking-tight"
          style={{ fontSize: "clamp(3.4rem, 13vw, 9rem)" }}
        >
          LARKINS
        </motion.h1>

        <motion.div
          variants={revealVariants("up")}
          className="flex items-center gap-3 t-meta text-accent"
        >
          <span className="inline-block h-px w-10 bg-accent" />
          coming soon
          <span className="inline-block h-px w-10 bg-accent" />
        </motion.div>

        <motion.p
          variants={revealVariants("up")}
          className="t-lead max-w-[34ch] text-text-muted"
        >
          AI-ассистент нового поколения для вашего бизнеса.
          Спокойный интеллект, встроенный в работу команды.
        </motion.p>

        <motion.div variants={revealVariants("up")}>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2.5 rounded-full border border-border
                       bg-bg-secondary/50 px-6 py-3.5 text-sm cursor-pointer
                       transition-colors duration-300 hover:border-accent/60 hover:text-accent"
          >
            <Icon name="arrow-right" size={16} className="rotate-180" />
            Вернуться и собрать бриф
          </Link>
        </motion.div>
      </motion.div>

      {/* Status line pinned to the base */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 t-meta text-text-muted/70">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={reduce ? undefined : { opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        status: dormant — calibrating
      </div>
    </section>
  );
}

/** A dimmer, slower orb — the intelligence at rest. */
function SleepingOrb() {
  const reduce = useReducedMotion();

  return (
    <div className="relative grid h-56 w-56 place-items-center sm:h-72 sm:w-72">
      {/* Faint pulse rings */}
      {!reduce &&
        [0, 1].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute h-[55%] w-[55%] rounded-full border border-accent/20"
            style={{
              animation: `pulse-ring 9s ${i * 4.5}s var(--ease-cinematic) infinite`,
            }}
          />
        ))}

      {/* Dim halo */}
      <div
        aria-hidden="true"
        className="absolute h-[80%] w-[80%] rounded-full blur-[55px] anim-glow"
        style={{
          background:
            "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          opacity: 0.6,
        }}
      />

      {/* Core — darker, slow breath */}
      <motion.div
        className="relative h-[58%] w-[58%] rounded-full"
        animate={reduce ? undefined : { scale: [1, 1.04, 1], opacity: [0.78, 0.95, 0.78] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 36% 32%, #5a4514 0%, var(--accent) 36%, #3a2c0c 62%, #120e06 100%)",
            boxShadow:
              "0 0 70px var(--accent-glow), inset -18px -22px 50px rgba(0,0,0,0.85), inset 10px 12px 30px rgba(255,224,150,0.25)",
          }}
        />
        {/* Slow conic drift */}
        <div
          className="absolute inset-0 overflow-hidden rounded-full opacity-40 mix-blend-screen anim-spin-slow"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(255,224,150,0.4) 90deg, transparent 200deg)",
          }}
        />
        {/* Resting core glow */}
        {!reduce && (
          <motion.div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 18px var(--accent)" }}
          />
        )}
      </motion.div>
    </div>
  );
}
