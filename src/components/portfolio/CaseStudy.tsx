"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import type { PortfolioItem } from "@/data/portfolio";

interface CaseStudyProps {
  item: PortfolioItem;
  next: PortfolioItem;
}

export function CaseStudy({ item, next }: CaseStudyProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const isPortrait = item.orientation === "portrait";
  const accentStyle = { "--member": item.accent } as CSSProperties;

  // Subtle parallax on the hero cover.
  const { scrollY } = useScroll();
  const coverY = useTransform(scrollY, [0, 600], [0, 120]);
  const coverScale = useTransform(scrollY, [0, 600], [1, 1.12]);

  return (
    <article style={accentStyle}>
      {/* ===== Hero ===== */}
      <header className="relative overflow-hidden">
        {/* Full-bleed cover with parallax */}
        <motion.div
          style={{ y: coverY, scale: coverScale }}
          className="absolute inset-0 -z-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.cover}
            alt={`${item.title} — обложка`}
            className="h-full w-full object-cover object-top"
          />
        </motion.div>
        {/* Wash for legibility + brand tint */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(180deg, color-mix(in srgb, var(--bg) 55%, transparent) 0%, color-mix(in srgb, var(--bg) 72%, transparent) 45%, var(--bg) 100%), radial-gradient(90% 60% at 15% 10%, color-mix(in srgb, ${item.accent} 30%, transparent), transparent 60%)`,
          }}
        />

        <div className="shell relative flex min-h-[78vh] flex-col justify-end pb-14 pt-36 sm:pb-20 sm:pt-40">
          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div
              variants={revealVariants("up")}
              className="flex items-center gap-3"
            >
              <Link
                href="/portfolio"
                className="t-meta inline-flex items-center gap-1.5 text-text-muted
                           transition-colors hover:text-text"
              >
                <Icon name="arrow-right" size={13} className="rotate-180" />
                Все работы
              </Link>
              <span className="h-3 w-px bg-border" />
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
            </motion.div>

            <motion.h1
              variants={revealVariants("up")}
              className="mt-6 font-display text-balance"
              style={{ fontSize: "clamp(2.6rem, 7vw, 5.2rem)", lineHeight: 1.02 }}
            >
              {item.title}
            </motion.h1>

            <motion.p
              variants={revealVariants("up")}
              className="mt-5 t-lead text-text-muted"
            >
              {item.tagline}
            </motion.p>

            <motion.div
              variants={revealVariants("up")}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted"
            >
              <span className="text-text">{item.client}</span>
              <span className="hidden h-3 w-px bg-border sm:block" />
              <span>{item.year}</span>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ===== Stats ===== */}
      <Section className="!py-0" contained>
        <motion.dl
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl surface
                     sm:grid-cols-4"
        >
          {item.stats.map((s) => (
            <motion.div
              key={s.label}
              variants={revealVariants("up")}
              className="flex flex-col gap-1 bg-surface p-5 sm:p-6"
            >
              <dt
                className="font-display"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: item.accent }}
              >
                {s.value}
              </dt>
              <dd className="text-sm leading-snug text-text-muted">{s.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </Section>

      {/* ===== Overview + services ===== */}
      <Section divided>
        <GridBackdrop variant="dots" />
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <motion.span
              variants={revealVariants("up")}
              className="t-meta text-text-muted"
            >
              О проекте
            </motion.span>
            <div className="mt-5 space-y-5">
              {item.overview.map((p, i) => (
                <motion.p
                  key={i}
                  variants={revealVariants("up")}
                  className="t-body text-text-muted"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={revealVariants("left")}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="lg:border-l lg:border-border lg:pl-12"
          >
            <span className="t-meta text-text-muted">Что делали</span>
            <ul className="mt-5 flex flex-col gap-2.5">
              {item.services.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 text-sm text-text"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.accent }}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* ===== Highlights ===== */}
      {item.highlights.length > 0 && (
        <Section divided className="!pt-0">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="grid gap-4 sm:grid-cols-2"
          >
            {item.highlights.map((h) => (
              <motion.div
                key={h.title}
                variants={revealVariants("up")}
                className="group relative overflow-hidden rounded-2xl surface p-6
                           transition-[border-color] duration-300 hover:border-border-strong"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-6 h-8 w-px"
                  style={{ backgroundColor: item.accent }}
                />
                <h3 className="t-card font-display">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {h.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}

      {/* ===== Gallery ===== */}
      <Section divided>
        <div className="mb-9 flex items-end justify-between gap-4">
          <h2 className="font-display t-section">
            Как это <em>выглядит</em>
          </h2>
          <span className="t-mono hidden text-sm text-text-faint sm:block">
            {item.gallery.length} экранов
          </span>
        </div>

        {isPortrait ? (
          /* Mobile stories — staggered phones */
          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
          >
            {item.gallery.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => setLightbox(i)}
                variants={revealVariants("up")}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="cursor-zoom-in"
                aria-label={`Открыть экран ${i + 1}`}
              >
                <PhoneFrame
                  src={src}
                  alt={`${item.title} — экран ${i + 1}`}
                  accent={item.accent}
                />
              </motion.button>
            ))}
          </motion.div>
        ) : (
          /* Desktop pages — stacked browser frames */
          <div className="flex flex-col gap-6 sm:gap-8">
            {item.gallery.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="cursor-zoom-in text-left"
                aria-label={`Открыть экран ${i + 1}`}
              >
                <BrowserFrame
                  src={src}
                  alt={`${item.title} — экран ${i + 1}`}
                />
              </motion.button>
            ))}
          </div>
        )}
      </Section>

      {/* ===== Next project ===== */}
      <Section divided>
        <Link
          href={`/portfolio/${next.slug}`}
          className="group relative block overflow-hidden rounded-2xl surface
                     transition-[border-color,box-shadow] duration-300
                     hover:border-border-strong hover:shadow-lift"
          style={{ "--member": next.accent } as CSSProperties}
        >
          <div className="relative grid items-center gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
            <div>
              <span className="t-meta text-text-muted">Следующий проект</span>
              <h3 className="mt-2 font-display t-section">{next.title}</h3>
              <p className="mt-2 max-w-xl text-sm text-text-muted">
                {next.summary}
              </p>
            </div>
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full border
                         border-border text-text transition-all duration-300
                         group-hover:translate-x-1"
              style={
                {
                  background: `color-mix(in srgb, ${next.accent} 14%, transparent)`,
                  borderColor: `color-mix(in srgb, ${next.accent} 40%, transparent)`,
                } as CSSProperties
              }
            >
              <Icon name="arrow-right" size={20} />
            </span>
          </div>
        </Link>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Button href="/portfolio" variant="secondary">
            <Icon name="arrow-right" size={15} className="rotate-180" />
            Ко всем работам
          </Button>
          <Button href="/#contact">
            Обсудить проект
            <Icon name="arrow-right" size={15} />
          </Button>
        </div>
      </Section>

      {/* ===== Lightbox ===== */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center
                       bg-bg/90 p-4 backdrop-blur-md sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={`${item.title} — просмотр`}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Закрыть"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center
                         rounded-xl border border-border text-text cursor-pointer
                         transition-colors hover:text-accent sm:right-6 sm:top-6"
            >
              <Icon name="close" size={20} />
            </button>
            <motion.img
              key={lightbox}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              src={item.gallery[lightbox]}
              alt={`${item.title} — экран ${lightbox + 1}`}
              className={
                isPortrait
                  ? "max-h-[88vh] w-auto rounded-2xl border border-border-strong"
                  : "max-h-[88vh] w-auto max-w-full rounded-xl border border-border-strong"
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
