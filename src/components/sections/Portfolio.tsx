"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import {
  portfolio,
  portfolioFilters,
  type PortfolioCategory,
} from "@/data/portfolio";

type Filter = PortfolioCategory | "all";

export function Portfolio() {
  const [active, setActive] = useState<Filter>("all");

  const items = useMemo(
    () =>
      active === "all"
        ? portfolio
        : portfolio.filter((p) => p.category === active),
    [active],
  );

  return (
    <Section id="portfolio">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="04 — Портфолио"
          title="Работы, которые <em>ушли в прод</em>"
          description="Подборка проектов разных направлений — от веб-платформ до автономных AI-агентов."
        />

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Фильтр работ"
          className="flex flex-wrap gap-2"
        >
          {portfolioFilters.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm cursor-pointer",
                  "transition-colors duration-200",
                  isActive
                    ? "border-accent bg-accent text-[#0b0b0c]"
                    : "border-border text-text-muted hover:border-accent/50 hover:text-text",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl
                         border border-border bg-bg-secondary/40
                         transition-colors duration-300 hover:border-accent/45"
            >
              {/* Cinematic cover */}
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{
                  background: `linear-gradient(140deg, ${item.cover[0]}, ${item.cover[1]})`,
                }}
              >
                <div className="grid-field absolute inset-0 opacity-50" />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500
                             group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 70% 30%, var(--accent-glow), transparent 65%)",
                  }}
                />
                {/* Year + glyph */}
                <span className="absolute left-5 top-5 t-mono text-xs text-text-muted">
                  {item.year}
                </span>
                <span
                  className="absolute right-5 top-5 grid h-9 w-9 place-items-center
                             rounded-lg border border-border bg-bg/60 text-text-muted
                             transition-colors duration-300 group-hover:text-accent"
                >
                  <Icon name="arrow-up-right" size={16} />
                </span>
                {/* Title overlay sliding in on hover */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="t-meta text-accent">{item.categoryLabel}</span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-2 p-6">
                <h3 className="t-card font-display">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {item.summary}
                </p>
              </div>

              {/* Hover reveal line */}
              <span
                className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent
                           transition-transform duration-500 ease-cinematic
                           group-hover:scale-x-100"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
