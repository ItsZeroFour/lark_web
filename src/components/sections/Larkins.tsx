"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow } from "@/components/ui/Glow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";
import {
  BRIEF_LABELS,
  LARKINS_GREETING,
  type ChatMessage,
} from "@/lib/claude";
import { cn } from "@/lib/utils";

interface DisplayMessage extends ChatMessage {
  id: number;
}

const INITIAL: DisplayMessage[] = [
  { id: 0, role: "assistant", content: LARKINS_GREETING },
];

export function Larkins() {
  const [messages, setMessages] = useState<DisplayMessage[]>(INITIAL);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  // Keep the latest message in view inside the console only.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const answered = messages.filter((m) => m.role === "user").length;

  async function send() {
    const text = input.trim();
    if (!text || busy || done) return;

    const userMsg: DisplayMessage = {
      id: idRef.current++,
      role: "user",
      content: text,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/larkins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data: { reply: string; done: boolean } = await res.json();

      setMessages((m) => [
        ...m,
        { id: idRef.current++, role: "assistant", content: data.reply },
      ]);
      if (data.done) setDone(true);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: idRef.current++,
          role: "assistant",
          content:
            "Связь с Larkins прервалась. Напишите нам напрямую — hello@larkfreelance.dev",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setMessages([{ id: idRef.current++, role: "assistant", content: LARKINS_GREETING }]);
    setDone(false);
    setInput("");
  }

  return (
    <Section id="contact">
      <Glow className="top-0 right-[10%]" size={520} pulse />

      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Narrative */}
        <div className="flex flex-col gap-7">
          <SectionHeading
            eyebrow="06 — Larkins AI"
            title="Не чат-бот. <em>Слой интеллекта</em>"
          />
          <Reveal delay={0.1}>
            <p className="t-body text-text-muted">
              Larkins — это интеллектуальный слой агентства. Он собирает бриф,
              задаёт правильные вопросы и передаёт задачу команде. Спокойно,
              по делу, без канцелярщины.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="flex flex-col gap-3">
              {[
                "Пять точных вопросов вместо длинной формы",
                "Понятное саммари брифа сразу после диалога",
                "Команда отвечает в течение часа",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-text-muted">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Console */}
        <Reveal direction="left" delay={0.1}>
          <div className="overflow-hidden rounded-3xl glass border border-border shadow-elevated">
            {/* Console header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <ConsoleOrb active={busy} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Larkins</span>
                  <span className="t-meta text-text-muted">
                    {busy ? "думает…" : done ? "бриф собран" : "готов к диалогу"}
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-bg-tertiary" />
                <span className="h-2.5 w-2.5 rounded-full bg-bg-tertiary" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              </div>
            </div>

            {/* Progress steps */}
            <div className="flex gap-1.5 px-5 py-3">
              {BRIEF_LABELS.map((label, i) => (
                <div key={label} className="flex flex-1 flex-col gap-1.5">
                  <span
                    className={cn(
                      "h-1 rounded-full transition-colors duration-500",
                      i < answered ? "bg-accent" : "bg-bg-tertiary",
                    )}
                  />
                  <span
                    className={cn(
                      "t-meta text-[0.6rem] transition-colors duration-500",
                      i < answered ? "text-text-muted" : "text-text-muted/40",
                    )}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Message log */}
            <div
              ref={logRef}
              className="flex h-[340px] flex-col gap-4 overflow-y-auto px-5 py-5"
              role="log"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "max-w-[86%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.role === "user"
                        ? "self-end bg-accent text-[#0b0b0c]"
                        : "self-start border border-border bg-bg/60 text-text",
                    )}
                  >
                    {m.content}
                  </motion.div>
                ))}
              </AnimatePresence>

              {busy && (
                <div className="self-start rounded-2xl border border-border bg-bg/60 px-4 py-3">
                  <TypingDots />
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-border p-4">
              {done ? (
                <button
                  type="button"
                  onClick={reset}
                  className="flex w-full items-center justify-center gap-2 rounded-xl
                             border border-border bg-bg/60 py-3 text-sm text-text-muted
                             cursor-pointer transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <Icon name="spark" size={15} />
                  Начать новый бриф
                </button>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void send();
                  }}
                  className="flex items-end gap-2"
                >
                  <label htmlFor="larkins-input" className="sr-only">
                    Сообщение для Larkins
                  </label>
                  <textarea
                    id="larkins-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void send();
                      }
                    }}
                    rows={1}
                    placeholder="Напишите ответ…"
                    disabled={busy}
                    className="max-h-28 min-h-[48px] flex-1 resize-none rounded-xl border border-border
                               bg-bg/60 px-4 py-3 text-sm text-text outline-none
                               placeholder:text-text-muted/60 focus:border-accent/60
                               disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    aria-label="Отправить сообщение"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl
                               bg-accent text-[#0b0b0c] cursor-pointer
                               transition-colors hover:bg-accent-light
                               disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Icon name="send" size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/** Small breathing orb for the console header. */
function ConsoleOrb({ active }: { active: boolean }) {
  return (
    <span className="relative grid h-9 w-9 place-items-center">
      <span
        className={cn(
          "absolute inset-0 rounded-full blur-md",
          active ? "anim-glow" : "opacity-50",
        )}
        style={{ background: "var(--accent-glow)" }}
      />
      <span
        className="relative h-5 w-5 rounded-full anim-breathe"
        style={{
          background:
            "radial-gradient(circle at 34% 30%, #fff3d6, var(--accent) 55%, #1c1608)",
          boxShadow: "0 0 14px var(--accent-glow)",
        }}
      />
    </span>
  );
}

/** Three-dot typing indicator. */
function TypingDots() {
  return (
    <span className="flex gap-1.5" aria-label="Larkins печатает">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}
