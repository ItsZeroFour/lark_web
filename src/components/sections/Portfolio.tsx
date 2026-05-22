"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { PortfolioCover } from "./PortfolioCover";
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
    <Section id="portfolio" divided>
      <GridBackdrop variant="lines" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="04 — Портфолио"
          title="Работы, которые <em>ушли в прод</em>"
          description="Проекты разных направлений — от веб-платформ до автономных AI-агентов."
        />

        {/* Filters — wrap instead of horizontal scroll so nothing is clipped */}
        <div
          role="tablist"
          aria-label="Фильтр работ"
          className="flex flex-wrap gap-1.5 lg:justify-end"
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
                  "shrink-0 rounded-full border px-3.5 py-2 text-sm cursor-pointer",
                  "transition-colors duration-200",
                  isActive
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-border text-text-muted hover:border-border-strong hover:text-text",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        layout
        className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex cursor-pointer flex-col overflow-hidden
                         rounded-2xl surface transition-colors duration-300
                         hover:border-border-strong hover:shadow-lift"
            >
              <Spotlight />

              {/* Cover — generative motif per category */}
              <PortfolioCover
                category={item.category}
                categoryLabel={item.categoryLabel}
                year={item.year}
                cover={item.cover}
              />

              {/* Body */}
              <div className="relative z-[1] flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="t-card font-display">{item.title}</h3>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg
                                   border border-border text-text-faint transition-colors
                                   duration-300 group-hover:border-accent group-hover:text-accent">
                    <Icon name="arrow-up-right" size={15} />
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-text-muted">
                  {item.summary}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
