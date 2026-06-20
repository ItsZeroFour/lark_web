"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Icon } from "@/components/ui/Icon";
import { revealVariants, staggerContainer } from "@/hooks/useReveal";
import { contact } from "@/data/contacts";

const headlineLine1 = ["Цифровые", "решения,"];
const headlineLine2 = ["которые", "работают"];

type Stat = {
  value: string;
  label: string;
  num?: number;
  suffix?: string;
  kind?: "count" | "static" | "eta";
};

const stats: Stat[] = [
  { value: "4", label: "человека в ядре команды", num: 4, kind: "count" },
  { value: "AI", label: "native-процессы", kind: "static" },
  { value: "1 час", label: "до первого ответа", num: 1, suffix: " час", kind: "eta" },
];

const capabilities = [
  "Web Development",
  "AI Automation",
  "IT под ключ",
  "Дизайн-системы",
  "Продуктовая стратегия",
  "Интеграции",
];

// Each headline word slides up while blur clears — feels editorial, not techy.
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden pt-28 pb-12 sm:pt-32"
    >
      <HeroBackground />

      {/* Cinematic scan-line — single sweep down the hero on mount */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: "-30%" }}
          animate={{ opacity: [0, 0.85, 0], y: "180%" }}
          transition={{ duration: 1.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-[180px]"
          style={{
            background:
              "linear-gradient(180deg, transparent, color-mix(in srgb, var(--accent) 38%, transparent), transparent)",
            filter: "blur(22px)",
          }}
        />
      )}

      <div className="shell flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer(0.09, 0.55)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow with a live-radar dot */}
          <motion.span
            variants={revealVariants("up")}
            className="inline-flex items-center gap-2 rounded-full border border-border
                       bg-bg-secondary px-3.5 py-1.5 t-meta text-text-muted"
          >
            <span className="relative grid h-1.5 w-1.5 place-items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span
                aria-hidden="true"
                className="anim-ping-soft absolute inset-0 rounded-full bg-accent"
              />
            </span>
            IT-агентство нового поколения
          </motion.span>

          {/* Headline — word-by-word reveal with blur clearing */}
          <motion.h1
            variants={staggerContainer(0.07, 0.05)}
            className="font-display t-hero text-balance mt-6 max-w-[16ch]"
          >
            <span className="block">
              {headlineLine1.map((w, i) => (
                <motion.span key={`l1-${i}`} variants={wordVariants} className="inline-block">
                  {w}
                  {i < headlineLine1.length - 1 && " "}
                </motion.span>
              ))}
            </span>
            <span className="block">
              {headlineLine2.map((w, i) => {
                const isAccent = i === headlineLine2.length - 1;
                return (
                  <motion.span
                    key={`l2-${i}`}
                    variants={wordVariants}
                    className="inline-block"
                  >
                    {isAccent ? <em>{w}</em> : w}
                    {i < headlineLine2.length - 1 && " "}
                  </motion.span>
                );
              })}
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={revealVariants("up")}
            className="t-lead text-text-muted text-pretty mt-6"
          >
            Стратегия, дизайн и AI-execution в одной команде.
            Для бизнеса, который думает вперёд.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={revealVariants("up")}
            className="mt-9 flex w-full flex-col gap-3 xs:w-auto xs:flex-row xs:items-center"
          >
            <Magnetic>
              <Button href="#contact" variant="primary" size="lg" fullWidth>
                Обсудить проект
                <Icon
                  name="arrow-right"
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/portfolio" variant="secondary" size="lg" fullWidth>
                Смотреть работы
              </Button>
            </Magnetic>
          </motion.div>

          {/* Trust line + idle nudge */}
          <motion.div
            variants={revealVariants("up")}
            className="relative mt-5 flex items-center gap-2 text-sm text-text-faint"
          >
            <Icon
              name="telegram"
              size={15}
              className="text-accent"
              data-magnet="telegram"
            />
            <span>Ответим в Telegram {contact.responseTime}</span>
            <IdleNudge />
          </motion.div>

          {/* Stats with count-up */}
          <motion.dl
            variants={revealVariants("up")}
            className="mt-12 flex w-full max-w-md overflow-hidden rounded-2xl surface"
          >
            {stats.map((s, i) => {
              const border = i > 0 ? "border-l border-border" : "";
              if (s.kind === "eta") {
                return (
                  <LiveEtaCell
                    key={s.label}
                    delay={1.4 + i * 0.08}
                    className={border}
                  />
                );
              }
              return (
                <div
                  key={s.label}
                  className={`flex flex-1 flex-col items-center gap-1.5 px-3 py-5 ${border}`}
                >
                  <dt className="font-display text-2xl amber tabular-nums sm:text-3xl">
                    {s.num !== undefined ? (
                      <CountUp to={s.num} delay={1.4 + i * 0.08} suffix={s.suffix} />
                    ) : (
                      s.value
                    )}
                  </dt>
                  <dd className="text-center text-[0.66rem] leading-tight text-text-muted">
                    {s.label}
                  </dd>
                </div>
              );
            })}
          </motion.dl>
        </motion.div>
      </div>

      {/* Capability marquee — two identical sets side by side; the animation
         translates by exactly one set's width so the second set seamlessly
         lands where the first started. Each set repeats the capability list
         a few times so one set is always wider than any realistic viewport
         (otherwise a wide screen sees a gap before the loop wraps). */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="mask-x relative mt-16 flex overflow-hidden border-y border-border py-3.5 sm:mt-20"
      >
        <div className="anim-marquee flex shrink-0 items-center">
          {[0, 1].map((setIdx) => (
            <div
              key={setIdx}
              className="flex shrink-0 items-center"
              aria-hidden={setIdx > 0 ? "true" : undefined}
            >
              {[0, 1, 2].flatMap((cycleIdx) =>
                capabilities.map((cap, i) => (
                  <span
                    key={`${setIdx}-${cycleIdx}-${i}`}
                    className="flex items-center gap-6 whitespace-nowrap px-6 t-meta text-text-faint"
                  >
                    {cap}
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-accent/60"
                    />
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Easter egg #10 — clicking the "1 час" stat reveals a live countdown to
 * the next response checkpoint (top of the next hour). Toggles back to the
 * idle "1 час" display on second click.
 */
function LiveEtaCell({
  delay,
  className = "",
}: {
  delay: number;
  className?: string;
}) {
  const [live, setLive] = useState(false);
  const [text, setText] = useState("00:00");

  useEffect(() => {
    if (!live) return;
    const compute = () => {
      const now = new Date();
      const target = new Date(now);
      target.setHours(now.getHours() + 1, 0, 0, 0);
      const diff = Math.max(0, target.getTime() - now.getTime());
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setText(
        `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
      );
    };
    compute();
    const id = window.setInterval(compute, 1000);
    return () => window.clearInterval(id);
  }, [live]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={live}
      aria-label={
        live ? "Скрыть живой обратный отсчёт" : "Показать живой обратный отсчёт"
      }
      onClick={() => setLive((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setLive((v) => !v);
        }
      }}
      className={`group relative flex flex-1 cursor-pointer flex-col items-center gap-1.5 px-3 py-5 outline-none transition-colors duration-300 hover:bg-bg-tertiary/40 focus-visible:bg-bg-tertiary/40 ${className}`}
    >
      {live && (
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 grid h-1.5 w-1.5 place-items-center"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="anim-ping-soft absolute inset-0 rounded-full bg-accent" />
        </span>
      )}
      <dt className="font-display text-2xl amber tabular-nums sm:text-3xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={live ? "live" : "idle"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {live ? text : <CountUp to={1} delay={delay} suffix=" час" />}
          </motion.span>
        </AnimatePresence>
      </dt>
      <dd className="text-center text-[0.66rem] leading-tight text-text-muted">
        {live ? "до окна ответа" : "до первого ответа"}
      </dd>
    </div>
  );
}

/**
 * Easter egg #35 — after 90 seconds of total page inactivity (no movement,
 * keystrokes, scrolls, or touches) a quiet line surfaces next to the trust
 * row for ~4 seconds, then fades. Resets on any subsequent activity.
 */
function IdleNudge() {
  const [visible, setVisible] = useState(false);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const events: (keyof DocumentEventMap)[] = [
      "pointermove",
      "pointerdown",
      "keydown",
      "wheel",
      "scroll",
      "touchstart",
    ];

    const clear = () => {
      if (showTimerRef.current) window.clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      showTimerRef.current = null;
      hideTimerRef.current = null;
    };

    const arm = () => {
      clear();
      showTimerRef.current = window.setTimeout(() => {
        setVisible(true);
        hideTimerRef.current = window.setTimeout(() => {
          setVisible(false);
          arm();
        }, 4000);
      }, 90_000);
    };

    const onActivity = () => {
      if (visible) return; // let it run its course
      arm();
    };

    arm();
    for (const ev of events) {
      window.addEventListener(ev, onActivity, { passive: true });
    }
    return () => {
      clear();
      for (const ev of events) {
        window.removeEventListener(ev, onActivity);
      }
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 4 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="ml-1 italic text-text-faint/80"
        >
          — ещё здесь? мы тоже, пишите
        </motion.span>
      )}
    </AnimatePresence>
  );
}

/**
 * Small inline count-up. RAF-driven, eased, respects reduced-motion.
 * Renders the target value immediately when reduced-motion is set.
 */
function CountUp({
  to,
  duration = 1.1,
  delay = 0,
  suffix = "",
}: {
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState<number>(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    let startTime = 0;
    const tick = (t: number) => {
      if (!startTime) startTime = t;
      const elapsed = (t - startTime) / 1000;
      if (elapsed < delay) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((elapsed - delay) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, delay, reduce]);

  return (
    <>
      {val}
      {suffix}
    </>
  );
}
