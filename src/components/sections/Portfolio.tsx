"use client";

import { type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Button } from "@/components/ui/Button";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { portfolio } from "@/data/portfolio";

/** Home section — a curated preview that links into the full gallery. */
export function Portfolio() {
  // Lead with the strongest, most varied covers.
  const featured = portfolio.slice(0, 6);

  return (
    <Section id="portfolio" divided>
      <GridBackdrop variant="lines" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="04 — Портфолио"
          title="Работы, которые <em>ушли в прод</em>"
          description="Лендинги, e-commerce, промо-кампании и интерактивные игры — от стоматологии до футбольных промо."
        />

        <Button href="/portfolio" variant="secondary" className="self-start lg:self-auto">
          Все работы
          <Icon name="arrow-up-right" size={15} />
        </Button>
      </div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {featured.map((item) => (
          <motion.article
            key={item.slug}
            variants={revealVariants("up")}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ "--member": item.accent } as CSSProperties}
            className="group relative"
          >
            <Link
              href={`/portfolio/${item.slug}`}
              className="relative flex h-full flex-col overflow-hidden rounded-2xl
                         surface transition-[border-color,box-shadow] duration-300
                         hover:border-border-strong hover:shadow-lift
                         focus-visible:outline-none focus-visible:border-accent/60"
            >
              <Spotlight />

              {/* Cover */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.cover}
                  alt={`${item.title} — обложка проекта`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top
                             transition-transform duration-[1.2s] ease-cinematic
                             group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 18%, transparent 32%), linear-gradient(180deg, transparent 40%, color-mix(in srgb, var(--bg) 75%, transparent) 80%, var(--bg) 100%), radial-gradient(120% 80% at 0% 0%, color-mix(in srgb, ${item.accent} 15%, transparent), transparent 55%)`,
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity
                             duration-300 group-hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--member), transparent)",
                  }}
                />
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
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
