"use client";

import { motion } from "framer-motion";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Mono eyebrow label, e.g. "02 — Услуги". */
  eyebrow?: string;
  /** Heading text. Wrap a word in <em> via the `accent` prop instead. */
  title: string;
  /** Optional supporting copy below the title. */
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Consistent section header: eyebrow + serif title + optional lead.
 * Reveals as a staggered group when scrolled into view.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  // Leading digits of the eyebrow ("02 — Услуги" → "02") drive the folio number.
  const folio = eyebrow?.match(/\d+/)?.[0];

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      className={cn(
        "relative flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {/* Architectural folio number — large, faint, behind the heading */}
      {folio && align === "left" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 right-0 -z-10 select-none
                     font-display leading-[0.8]"
          style={{
            fontSize: "clamp(4.5rem, 11vw, 8.5rem)",
            color: "color-mix(in srgb, var(--text) 5%, transparent)",
          }}
        >
          {folio}
        </span>
      )}
      {eyebrow && (
        <motion.span
          variants={revealVariants("up")}
          className="t-meta text-text-muted flex items-center gap-2.5"
        >
          {/* Live status dot */}
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping
                             rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span
            className="inline-block h-px w-7 bg-gradient-to-r from-accent to-transparent"
            aria-hidden="true"
          />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={revealVariants("up")}
        className="font-display t-section text-balance max-w-[20ch]"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {description && (
        <motion.p
          variants={revealVariants("up")}
          className={cn(
            "t-lead text-text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
