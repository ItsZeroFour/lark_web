"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Glow } from "@/components/ui/Glow";
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
    <Section id="services">
      <Glow className="top-10 left-1/2 -translate-x-1/2" size={520} />

      <SectionHeading
        eyebrow="02 — Услуги"
        title="Четыре направления, <em>одна</em> команда"
        description="Мы закрываем полный цикл цифровой работы — без передачи задач между подрядчиками."
      />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((service) => {
          const inner = (
            <Card
              interactive={!service.featured}
              featured={service.featured}
              className="flex h-full flex-col gap-5"
            >
              <div className="flex items-start justify-between">
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl border border-border
                             bg-bg text-accent transition-colors duration-300
                             group-hover:border-accent/50"
                >
                  <Icon name={icons[service.id]} size={22} />
                </span>
                <span className="t-mono text-sm text-text-muted">
                  {service.index}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="t-card font-display">{service.title}</h3>
                {service.status && (
                  <span className="t-meta inline-flex w-fit items-center gap-1.5
                                   rounded-full border border-accent/40 px-2.5 py-1 text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent anim-glow" />
                    {service.status}
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed text-text-muted">
                {service.summary}
              </p>

              <ul className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
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
            </Card>
          );

          // Larkins links through to its dedicated page.
          return service.featured ? (
            <Link
              key={service.id}
              href="/larkins"
              className="block cursor-pointer"
              aria-label="Larkins AI — открыть страницу"
            >
              {inner}
            </Link>
          ) : (
            <div key={service.id}>{inner}</div>
          );
        })}
      </motion.div>
    </Section>
  );
}
