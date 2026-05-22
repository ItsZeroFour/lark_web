"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero backdrop — cinematic but restrained.
 * A breathing AI-core glow, a faint infrastructure grid, and two slow
 * light beams sweeping the frame. All ambient motion collapses to a
 * static composition under reduced-motion preferences.
 */
export function HeroBackground() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {/* Soft warmth pooled at the top */}
      <div
        className="absolute inset-x-0 top-0 h-[75%]"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, var(--warmth) 0%, transparent 65%)",
        }}
      />

      {/* Infrastructure grid — faint, dissolving downward */}
      <div className="grid-lines mask-t absolute inset-x-0 top-0 h-[82%]" />

      {/* Breathing AI-core glow behind the headline */}
      <motion.div
        className="absolute left-1/2 top-[44%] h-[460px] w-[460px]
                   -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--glow) 0%, transparent 68%)",
        }}
        animate={
          reduce ? undefined : { scale: [1, 1.14, 1], opacity: [0.65, 1, 0.65] }
        }
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Concentric core rings — quiet "intelligence presence" */}
      <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
        {[300, 480, 660].map((d, i) => (
          <motion.span
            key={d}
            className="absolute rounded-full border border-accent/[0.07]"
            style={{ width: d, height: d, left: -d / 2, top: -d / 2 }}
            animate={
              reduce ? undefined : { opacity: [0.25, 0.6, 0.25] }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Travelling light beams */}
      {!reduce && (
        <>
          <motion.div
            className="absolute left-0 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 55%, transparent), transparent)",
            }}
            animate={{ top: ["16%", "74%"], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2.5,
            }}
          />
          <motion.div
            className="absolute top-0 h-full w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent, color-mix(in srgb, var(--accent) 42%, transparent), transparent)",
            }}
            animate={{ left: ["72%", "24%"], opacity: [0, 0.4, 0] }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 4,
            }}
          />
        </>
      )}

      {/* Clean settle into the page background */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(180deg, transparent, var(--bg))" }}
      />
    </div>
  );
}
