"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Glow } from "@/components/ui/Glow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Icon, type IconName } from "@/components/ui/Icon";
import { revealViewport, staggerContainer } from "@/hooks/useReveal";
import { services } from "@/data/services";

const icons: Record<string, IconName> = {
  web: "code",
  ai: "circuit",
  turnkey: "layers",
  larkins: "spark",
};

export function Services() {
  return (
    <Section id="services" divided>
      {/* Quiet ambient warmth + faint structural grid — never distracting */}
      <Glow className="-top-20 right-0 opacity-60" size={520} />
      <GridBackdrop variant="lines" />

      <SectionHeading
        eyebrow="02 — Услуги"
        title="Четыре направления, <em>одна</em> команда"
        description="Закрываем полный цикл цифровой работы — без передачи задач между подрядчиками."
      />

      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((service) => {
          const inner = (
            <Card
              interactive={!service.featured}
              featured={service.featured}
              className="group/card flex h-full flex-col gap-4"
            >
              {/* Hover accent line along the top edge */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px
                           bg-gradient-to-r from-transparent via-accent to-transparent
                           opacity-0 transition-opacity duration-300
                           group-hover/card:opacity-70"
              />

              <div className="relative flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl
                                 border border-border bg-bg text-accent
                                 transition-colors duration-300
                                 group-hover/card:border-accent/40">
                  <Icon name={icons[service.id]} size={20} />
                </span>
                <span className="t-mono text-sm text-text-faint">
                  {service.index}
                </span>
              </div>

              {/* Title + status — fixed height keeps every card body aligned */}
              <div className="relative flex min-h-[3.25rem] flex-wrap content-start
                              items-center gap-2">
                <h3 className="t-card font-display">{service.title}</h3>
                {service.status && (
                  <span className="t-meta inline-flex items-center gap-1.5
                                   rounded-full border border-accent/40 px-2 py-0.5
                                   text-[0.62rem] text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {service.status}
                  </span>
                )}
              </div>

              {/* Summary — fixed height so the divider lands on one line */}
              <p className="relative min-h-[8.5rem] text-[0.95rem] leading-relaxed text-text-muted">
                {service.summary}
              </p>

              {/* Capabilities */}
              <ul className="relative flex flex-col gap-1.5 border-t border-border pt-4">
                {service.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-center gap-2 text-sm text-text-muted"
                  >
                    <Icon name="check" size={14} className="shrink-0 text-accent" />
                    {cap}
                  </li>
                ))}
              </ul>

              {/* Footer — identical on every card, pinned to the bottom edge */}
              <div className="relative mt-auto flex flex-col gap-3.5 border-t border-border pt-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="t-meta text-text-faint">Стоимость</span>
                  <span className="font-display text-base text-text tabular-nums">
                    {service.price}
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                  {service.featured ? "Открыть Larkins" : "Обсудить задачу"}
                  <Icon
                    name="arrow-right"
                    size={14}
                    className="transition-transform duration-300
                               group-hover/card:translate-x-0.5"
                  />
                </span>
              </div>
            </Card>
          );

          return (
            <Link
              key={service.id}
              href={service.featured ? "/larkins" : "/#contact"}
              className="block cursor-pointer"
              aria-label={
                service.featured
                  ? "Larkins AI — открыть страницу"
                  : `${service.title} — обсудить задачу`
              }
            >
              {inner}
            </Link>
          );
        })}
      </motion.div>
    </Section>
  );
}
