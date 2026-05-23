"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow } from "@/components/ui/Glow";
import { Spotlight } from "@/components/ui/Spotlight";
import { Icon } from "@/components/ui/Icon";
import { revealVariants, revealViewport, staggerContainer } from "@/hooks/useReveal";
import { team } from "@/data/team";

export function Team() {
  // Easter egg #13 — once every member card has been hovered in any order,
  // a constellation links them with thin lines and a central orb pulses.
  const gridRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());
  const [constellation, setConstellation] = useState(false);

  // Trigger when all four are hovered. Auto-release a few seconds later.
  useEffect(() => {
    if (discovered.size < team.length) return;
    setConstellation(true);
    const t = window.setTimeout(() => {
      setConstellation(false);
      setDiscovered(new Set());
    }, 3800);
    return () => window.clearTimeout(t);
  }, [discovered]);

  const markDiscovered = (id: string) => {
    setDiscovered((prev) => {
      if (prev.has(id) || prev.size >= team.length) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <Section id="team" divided>
      {/* One quiet ambient warmth — never distracting */}
      <Glow className="-top-16 left-1/4 opacity-50" size={520} />

      <SectionHeading
        eyebrow="05 — Команда"
        title="Четыре человека — <em>ядро</em> команды"
        description="Это ядро команды. Вокруг него под каждый проект собирается сеть проверенных специалистов."
      />

      <div className="relative mt-10">
        <motion.ul
          ref={gridRef}
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="grid items-stretch gap-4 xs:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((member) => (
            <motion.li
              key={member.id}
              ref={(el) => {
                cardRefs.current[member.id] = el;
              }}
              variants={revealVariants("up")}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onPointerEnter={() => markDiscovered(member.id)}
              onFocus={() => markDiscovered(member.id)}
              tabIndex={0}
              style={
                {
                  "--member": member.accent,
                  "--spotlight": `color-mix(in srgb, ${member.accent} 20%, transparent)`,
                } as CSSProperties
              }
              className="group/card relative overflow-hidden rounded-2xl surface
                         transition-[border-color,box-shadow] duration-300 ease-cinematic
                         hover:border-border-strong hover:shadow-lift
                         focus-visible:border-accent/60 focus-visible:outline-none"
            >
            <Spotlight />

            {/* Hover accent line along the top edge */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px opacity-0
                         transition-opacity duration-300 group-hover/card:opacity-80"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--member), transparent)",
              }}
            />

            <div className="relative z-[1] flex h-full flex-col">
              {/* Portrait — photo placeholder until real images land */}
              <div
                className="relative aspect-[4/5] overflow-hidden border-b border-border"
                style={{
                  background:
                    "linear-gradient(155deg, color-mix(in srgb, var(--member) 24%, var(--bg-tertiary)), var(--bg))",
                }}
              >
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo}
                    alt={`${member.name} — ${member.caption}`}
                    className="h-full w-full object-cover transition-transform
                               duration-500 ease-cinematic group-hover/card:scale-[1.04]"
                  />
                ) : (
                  <>
                    {/* Silhouette stand-in */}
                    <span
                      className="absolute inset-0 grid place-items-center
                                 transition-transform duration-500 ease-cinematic
                                 group-hover/card:scale-[1.05]"
                    >
                      <Icon
                        name="user"
                        size={68}
                        style={{
                          color:
                            "color-mix(in srgb, var(--member) 55%, transparent)",
                        }}
                      />
                    </span>
                    {/* Placeholder caption */}
                    <span
                      className="t-meta absolute inset-x-0 bottom-3 text-center
                                 text-[0.58rem] text-text-faint"
                    >
                      фото скоро
                    </span>
                  </>
                )}

                {/* Monogram badge */}
                <span
                  className="absolute left-3 top-3 grid h-9 w-9 place-items-center
                             rounded-lg border font-display text-sm"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--member) 40%, var(--border))",
                    background:
                      "color-mix(in srgb, var(--member) 18%, var(--surface))",
                    color: "var(--member)",
                  }}
                >
                  {member.monogram}
                </span>

                {/* Live dot */}
                <span
                  className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: "var(--member)",
                    boxShadow:
                      "0 0 10px 1px color-mix(in srgb, var(--member) 60%, transparent)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg">{member.name}</h3>
                {/* Fixed height keeps the divider on one line across every card */}
                <p
                  className="mt-1 flex min-h-[2.75rem] items-start text-sm font-medium"
                  style={{ color: "var(--member)" }}
                >
                  {member.caption}
                </p>
                {/* Divider stays on one line right after the fixed-height caption */}
                <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-text-muted">
                  {member.trait}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>

        <Constellation
          active={constellation}
          gridRef={gridRef}
          cardRefs={cardRefs}
        />

        {/* Progress hint — only while the user is hunting */}
        <AnimatePresence>
          {!constellation &&
            discovered.size > 0 &&
            discovered.size < team.length && (
              <motion.div
                key="hint"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute left-1/2 top-full mt-6
                           -translate-x-1/2 flex items-center gap-1.5"
                aria-hidden="true"
              >
                {team.map((m) => (
                  <span
                    key={m.id}
                    className="h-1 w-6 rounded-full transition-colors duration-300"
                    style={{
                      background: discovered.has(m.id)
                        ? "var(--accent)"
                        : "var(--bg-tertiary)",
                    }}
                  />
                ))}
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </Section>
  );
}

/**
 * SVG overlay rendered above the team grid when all four cards are
 * discovered. Lines connect every pair of cards, a central orb pulses,
 * and the whole thing fades after the parent releases the state.
 */
function Constellation({
  active,
  gridRef,
  cardRefs,
}: {
  active: boolean;
  gridRef: React.RefObject<HTMLUListElement>;
  cardRefs: React.RefObject<Record<string, HTMLLIElement | null>>;
}) {
  const [geom, setGeom] = useState<{
    w: number;
    h: number;
    points: { id: string; x: number; y: number }[];
    center: { x: number; y: number };
  } | null>(null);

  useEffect(() => {
    if (!active) {
      setGeom(null);
      return;
    }
    const grid = gridRef.current;
    if (!grid) return;
    const gr = grid.getBoundingClientRect();
    const points: { id: string; x: number; y: number }[] = [];
    for (const m of team) {
      const el = cardRefs.current?.[m.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      points.push({
        id: m.id,
        x: r.left + r.width / 2 - gr.left,
        y: r.top + r.height / 2 - gr.top,
      });
    }
    if (points.length < team.length) return;
    setGeom({
      w: gr.width,
      h: gr.height,
      points,
      center: { x: gr.width / 2, y: gr.height / 2 },
    });
  }, [active, gridRef, cardRefs]);

  return (
    <AnimatePresence>
      {active && geom && (
        <motion.svg
          key="constellation"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          width={geom.w}
          height={geom.h}
          viewBox={`0 0 ${geom.w} ${geom.h}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <defs>
            <radialGradient id="constellation-orb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde08a" stopOpacity="1" />
              <stop offset="55%" stopColor="#d4a017" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#d4a017" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="constellation-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(212,160,23,0)" />
              <stop offset="50%" stopColor="rgba(212,160,23,0.85)" />
              <stop offset="100%" stopColor="rgba(212,160,23,0)" />
            </linearGradient>
          </defs>

          {geom.points.flatMap((a, i) =>
            geom.points.slice(i + 1).map((b) => {
              const len = Math.hypot(b.x - a.x, b.y - a.y);
              return (
                <motion.line
                  key={`${a.id}-${b.id}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="url(#constellation-line)"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  initial={{ strokeDasharray: len, strokeDashoffset: len, opacity: 0 }}
                  animate={{ strokeDashoffset: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            }),
          )}

          {geom.points.map((p) => (
            <motion.circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={3}
              fill="#f0b040"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
          ))}

          <motion.circle
            cx={geom.center.x}
            cy={geom.center.y}
            r={42}
            fill="url(#constellation-orb)"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{
              scale: [0.4, 1.1, 0.95, 1.05, 1],
              opacity: [0, 0.95, 0.85, 0.95, 0.9],
            }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.35,
            }}
            style={{ transformOrigin: `${geom.center.x}px ${geom.center.y}px` }}
          />
          <motion.text
            x={geom.center.x}
            y={geom.center.y + 4}
            textAnchor="middle"
            className="font-mono"
            fontSize={10}
            letterSpacing="0.22em"
            fill="rgba(10,10,11,0.85)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            CORE
          </motion.text>
        </motion.svg>
      )}
    </AnimatePresence>
  );
}
