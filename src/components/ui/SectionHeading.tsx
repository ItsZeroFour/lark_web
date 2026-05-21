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
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.span
          variants={revealVariants("up")}
          className="t-meta text-text-muted flex items-center gap-3"
        >
          <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
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
