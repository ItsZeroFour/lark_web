"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn } from "@/lib/utils";
import {
  portfolio,
  portfolioFilters,
  type PortfolioCategory,
} from "@/data/portfolio";

type Filter = PortfolioCategory | "all";

export function PortfolioGallery() {
  const [active, setActive] = useState<Filter>("all");

  const items = useMemo(
    () =>
      active === "all"
        ? portfolio
        : portfolio.filter((p) => p.category === active),
    [active],
  );

  return (
    <div>
      {/* Filters */}
      <div
        role="tablist"
        aria-label="Фильтр работ"
        className="flex flex-wrap gap-1.5"
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
                "shrink-0 rounded-full border px-4 py-2 text-sm cursor-pointer",
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

      <motion.div
        layout
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-12"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            // First card runs wide for an editorial, asymmetric rhythm.
            const wide = active === "all" && i === 0;
            return (
              <motion.article
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ "--member": item.accent } as CSSProperties}
                className={cn(
                  "group relative lg:col-span-6",
                  wide && "lg:col-span-12",
                )}
              >
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl
                             surface transition-[border-color,box-shadow,transform] duration-300
                             ease-cinematic hover:-translate-y-1 hover:shadow-lift
                             focus-visible:outline-none focus-visible:border-accent/60"
                >
                  <Spotlight />

                  {/* Cover */}
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      wide ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[16/10]",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.cover}
                      alt={`${item.title} — обложка проекта`}
                      loading={i < 2 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full object-cover object-top
                                 transition-transform duration-[1.2s] ease-cinematic
                                 group-hover:scale-[1.05]"
                    />
                    {/* Readability + brand tint. Top is darkened so the meta
                        row stays legible even over bright (e.g. yellow) covers. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 18%, transparent 32%), linear-gradient(180deg, transparent 35%, color-mix(in srgb, var(--bg) 78%, transparent) 78%, var(--bg) 100%), radial-gradient(120% 80% at 0% 0%, color-mix(in srgb, ${item.accent} 16%, transparent), transparent 55%)`,
                      }}
                    />
                    {/* Top accent hairline on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity
                                 duration-300 group-hover:opacity-90"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, var(--member), transparent)",
                      }}
                    />

                    {/* Meta row */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                      <span
                        className="t-meta rounded-full border px-2.5 py-1 backdrop-blur-md"
                        style={{
                          color: item.accent,
                          borderColor: `color-mix(in srgb, ${item.accent} 55%, transparent)`,
                          background: "rgba(8,8,9,0.55)",
                        }}
                      >
                        {item.categoryLabel}
                      </span>
                      <span
                        className="t-mono rounded-full px-2 py-1 text-xs backdrop-blur-md"
                        style={{ color: "rgba(255,255,255,0.78)", background: "rgba(8,8,9,0.45)" }}
                      >
                        {item.year}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="relative z-[1] -mt-px flex flex-1 flex-col gap-2 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="t-card font-display">{item.title}</h3>
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border
                                   border-border text-text-faint transition-colors duration-300
                                   group-hover:text-accent-ink"
                        style={
                          {
                            "--tw-border-opacity": 1,
                          } as CSSProperties
                        }
                      >
                        <span
                          className="grid h-full w-full place-items-center rounded-[7px]
                                     transition-colors duration-300 group-hover:bg-[var(--member)]"
                        >
                          <Icon name="arrow-up-right" size={16} />
                        </span>
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-text-muted">
                      {item.summary}
                    </p>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
