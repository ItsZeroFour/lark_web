"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The Larkins AI core — a procedural glowing sphere.
 * It breathes, pulses and drifts: a living intelligence presence,
 * not a static graphic. Built from layered gradients + SVG, no 3D deps.
 */
export function HeroOrb() {
  const reduce = useReducedMotion();

  return (
    <div className="relative grid aspect-square w-full max-w-[460px] place-items-center">
      {/* Outer neural pulse rings */}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute h-[58%] w-[58%] rounded-full border border-accent/30"
            style={{
              animation: `pulse-ring 6s ${i * 2}s var(--ease-cinematic) infinite`,
            }}
          />
        ))}

      {/* Ambient halo */}
      <div
        aria-hidden="true"
        className="absolute h-[88%] w-[88%] rounded-full blur-[60px] anim-glow"
        style={{
          background:
            "radial-gradient(circle, var(--accent-glow) 0%, transparent 68%)",
        }}
      />

      {/* Orbiting intelligence nodes */}
      <motion.div
        className="absolute h-[78%] w-[78%]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        {[0, 120, 240].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent-light"
            style={{
              transformOrigin: "50% 0",
              transform: `rotate(${deg}deg)`,
              boxShadow: "0 0 12px var(--accent)",
            }}
          />
        ))}
      </motion.div>

      {/* The core sphere */}
      <motion.div
        className="relative h-[62%] w-[62%] rounded-full anim-breathe"
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Base body — directional light */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 34% 30%, #fff3d6 0%, var(--accent-light) 22%, var(--accent) 48%, #6e5210 78%, #1c1608 100%)",
            boxShadow:
              "0 0 90px var(--accent-glow), inset -22px -26px 60px rgba(0,0,0,0.7), inset 14px 16px 40px rgba(255,232,170,0.45)",
          }}
        />

        {/* Slow rotating conic energy band */}
        <div
          className="absolute inset-0 overflow-hidden rounded-full opacity-70 mix-blend-screen anim-spin-slow"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(255,224,150,0.55) 70deg, transparent 150deg, rgba(255,224,150,0.35) 240deg, transparent 320deg)",
          }}
        />

        {/* Neural filament network */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full opacity-60 mix-blend-overlay"
          aria-hidden="true"
        >
          <g
            stroke="rgba(255,240,200,0.7)"
            strokeWidth="0.7"
            fill="rgba(255,240,200,0.9)"
          >
            <path d="M48 70 L92 96 L70 140 M92 96 L138 78 L150 124 M92 96 L110 56" fill="none" />
            <circle cx="48" cy="70" r="2.4" />
            <circle cx="92" cy="96" r="3.2" />
            <circle cx="70" cy="140" r="2.4" />
            <circle cx="138" cy="78" r="2.4" />
            <circle cx="150" cy="124" r="2.2" />
            <circle cx="110" cy="56" r="2" />
          </g>
        </svg>

        {/* Specular highlight */}
        <div
          className="absolute left-[24%] top-[18%] h-[26%] w-[26%] rounded-full blur-md"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)",
          }}
        />

        {/* Core pulse */}
        {!reduce && (
          <motion.div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 24px #fff" }}
          />
        )}
      </motion.div>

      {/* Status caption */}
      <div className="absolute -bottom-2 flex items-center gap-2 t-meta text-text-muted">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        Larkins · core online
      </div>
    </div>
  );
}
