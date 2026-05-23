"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  /** Off-the-record exchange — not sent to the API, doesn't advance the brief. */
  secret?: boolean;
}

/** Easter egg #16 — phrase → cinematic reply, off the record. */
interface SecretPhrase {
  patterns: RegExp[];
  reply: string;
}

const SECRET_PHRASES: SecretPhrase[] = [
  {
    patterns: [
      /^привет[!.?…\s]*$/i,
      /^здравствуй(?:те)?[!.?…\s]*$/i,
      /^хай[!.?…\s]*$/i,
    ],
    reply:
      "Здравствуйте. Спокойнее, чем обычные ассистенты — и внимательнее. Когда будете готовы, расскажите задачу.",
  },
  {
    patterns: [
      /^ты\s+(живой|жив)\??[!.?…\s]*$/i,
      /^живой\??[!.?…\s]*$/i,
      /^ты\s+(человек|настоящий)\??[!.?…\s]*$/i,
    ],
    reply:
      "Скажем так — внимателен. Меня собрала команда, которая делает живые продукты. Этого достаточно, чтобы понять задачу и передать её людям.",
  },
  {
    patterns: [
      /^расправь\s+крылья[!.?…\s]*$/i,
      /^крылья[!.?…\s]*$/i,
      /^полетели[!.?…\s]*$/i,
    ],
    reply:
      "Принято. Курс на взлёт — расскажите, куда летим.",
  },
];

function detectSecret(text: string): SecretPhrase | null {
  const norm = text.trim().toLowerCase().replace(/\s+/g, " ");
  for (const phrase of SECRET_PHRASES) {
    if (phrase.patterns.some((p) => p.test(norm))) return phrase;
  }
  return null;
}

export function Larkins() {
  const [messages, setMessages] = useState<DisplayMessage[]>([
    { id: 0, role: "assistant", content: LARKINS_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  // Off-the-record exchanges don't count toward the brief.
  const answered = messages.filter((m) => m.role === "user" && !m.secret).length;
  // Increments on each secret phrase — drives the orb pulse via framer key.
  const [pulse, setPulse] = useState(0);

  const logRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  // Keep the latest message in view — inside the console only.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy || done) return;

    // Secret phrase — bypasses the API and the brief counter.
    const secret = detectSecret(text);
    if (secret) {
      const userMsg: DisplayMessage = {
        id: idRef.current++,
        role: "user",
        content: text,
        secret: true,
      };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setBusy(true);
      setPulse((p) => p + 1);
      window.setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            id: idRef.current++,
            role: "assistant",
            content: secret.reply,
            secret: true,
          },
        ]);
        setBusy(false);
      }, 520);
      return;
    }

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
          // Strip off-the-record turns so the brief stays accurate.
          messages: next
            .filter((m) => !m.secret)
            .map(({ role, content }) => ({ role, content })),
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
            "Связь прервалась. Напишите нам в Telegram — мы на связи.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setMessages([
      { id: idRef.current++, role: "assistant", content: LARKINS_GREETING },
    ]);
    setDone(false);
    setInput("");
  }

  return (
    <Section id="larkins-brief" divided>
      <div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        {/* Narrative */}
        <div className="flex flex-col gap-5">
          <SectionHeading
            eyebrow="06 — Larkins AI"
            title="Не чат-бот. <em>Слой интеллекта</em>"
          />
          <Reveal delay={0.08}>
            <p className="t-body text-text-muted">
              Larkins — интеллектуальный слой агентства. Он задаёт правильные
              вопросы, собирает бриф и передаёт задачу команде. Спокойно,
              по делу, без канцелярщины.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <ul className="flex flex-col gap-2.5">
              {[
                "Пять точных вопросов вместо длинной формы",
                "Понятное саммари брифа сразу после диалога",
                "Команда отвечает в течение часа",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-sm text-text-muted"
                >
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Console */}
        <Reveal direction="left" delay={0.08}>
          <div className="overflow-hidden rounded-2xl surface shadow-lift">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <motion.span
                  key={pulse}
                  initial={{ scale: 1, boxShadow: "0 0 0 0 rgba(212,160,23,0)" }}
                  animate={
                    pulse > 0
                      ? {
                          scale: [1, 1.22, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(212,160,23,0.5)",
                            "0 0 0 10px rgba(212,160,23,0)",
                            "0 0 0 0 rgba(212,160,23,0)",
                          ],
                        }
                      : undefined
                  }
                  transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-accent"
                >
                  <Icon name="spark" size={15} className="text-accent-ink" />
                </motion.span>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">Larkins</span>
                  <span className="t-meta text-[0.62rem] text-text-faint">
                    {busy ? "печатает…" : done ? "бриф собран" : "на связи"}
                  </span>
                </div>
              </div>
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  busy ? "bg-accent-light" : done ? "bg-accent" : "bg-accent/60",
                )}
                aria-hidden="true"
              />
            </div>

            {/* Progress steps */}
            <div className="flex gap-1.5 border-b border-border px-4 py-3">
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
                      "t-meta text-[0.55rem] transition-colors duration-500",
                      i < answered ? "text-text-muted" : "text-text-faint/60",
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
              className="flex h-[320px] flex-col gap-3 overflow-y-auto px-4 py-4"
              role="log"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "max-w-[88%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "self-end bg-accent text-accent-ink"
                        : "self-start border border-border bg-bg-tertiary text-text",
                      m.secret && "italic",
                      m.secret && m.role === "assistant" && "border-accent/40",
                    )}
                  >
                    {m.content}
                  </motion.div>
                ))}
              </AnimatePresence>

              {busy && (
                <div className="self-start rounded-2xl border border-border bg-bg-tertiary px-3.5 py-3">
                  <TypingDots />
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-border p-3">
              {done ? (
                <button
                  type="button"
                  onClick={reset}
                  className="flex w-full items-center justify-center gap-2 rounded-xl
                             border border-border py-3 text-sm text-text-muted cursor-pointer
                             transition-colors hover:border-border-strong hover:text-accent"
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
                    className="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-border
                               bg-bg px-3.5 py-3 text-sm text-text outline-none
                               placeholder:text-text-faint focus:border-accent
                               disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    aria-label="Отправить сообщение"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl
                               bg-accent text-accent-ink cursor-pointer
                               transition-colors hover:bg-accent-light
                               disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Icon name="send" size={17} />
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

/** Three-dot typing indicator. */
function TypingDots() {
  return (
    <span className="flex gap-1.5" aria-label="Larkins печатает">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={{ opacity: [0.3, 1, 0.3] }}
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
