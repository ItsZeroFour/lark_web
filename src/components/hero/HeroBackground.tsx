"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Glow } from "@/components/ui/Glow";

/**
 * Cinematic hero atmosphere: infrastructure grid, depth gradients,
 * travelling lines and soft amber light. Purely decorative.
 */
export function HeroBackground() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Depth gradient — top-down vignette into the page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 22%, var(--halo) 0%, transparent 60%), linear-gradient(180deg, transparent 55%, var(--bg) 100%)",
        }}
      />

      {/* Infrastructure grid with radial fade */}
      <div className="grid-field mask-radial absolute inset-0" />

      {/* Animated infrastructure lines */}
      <div className="absolute inset-x-0 top-[28%] h-px infra-line opacity-70" />
      <div
        className="absolute inset-x-0 top-[62%] h-px infra-line opacity-40"
        style={{ animationDelay: "-7s", animationDuration: "18s" }}
      />

      {/* Vertical scan line */}
      {!reduce && (
        <motion.div
          className="absolute top-0 h-full w-px"
          style={{
            background:
              "linear-gradient(180deg, transparent, var(--accent), transparent)",
          }}
          initial={{ left: "12%", opacity: 0 }}
          animate={{ left: ["12%", "88%"], opacity: [0, 0.5, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Procedural glows */}
      <Glow className="-top-32 right-[8%]" size={560} pulse color="var(--accent-glow)" />
      <Glow className="bottom-[2%] left-[-8%]" size={420} color="var(--halo)" />

      {/* Corner registration marks — quiet UI atmosphere */}
      {[
        "left-6 top-28",
        "right-6 top-28",
        "left-6 bottom-10",
        "right-6 bottom-10",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} h-3 w-3 border-l border-t border-border`}
        />
      ))}
    </div>
  );
}
