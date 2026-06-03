"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";
import { LARKINS_GREETING, type ChatMessage } from "@/lib/claude";
import { contact } from "@/data/contacts";
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
    reply: "Принято. Курс на взлёт — расскажите, куда летим.",
  },
];

function detectSecret(text: string): SecretPhrase | null {
  const norm = text.trim().toLowerCase().replace(/\s+/g, " ");
  for (const phrase of SECRET_PHRASES) {
    if (phrase.patterns.some((p) => p.test(norm))) return phrase;
  }
  return null;
}

/**
 * The five-field commercial proposal Larkins assembles from the brief.
 * Each field maps to the user's answer at the same index.
 */
const SPEC_FIELDS: readonly { label: string; pending: string }[] = [
  { label: "Тип решения & задачи", pending: "Ожидание ответа о задаче проекта…" },
  { label: "Сфера бизнеса & целевая аудитория", pending: "Ожидание ответа о сфере деятельности…" },
  { label: "Примеры & референсы", pending: "Ожидание референсов…" },
  { label: "Планируемый бюджет", pending: "Ожидание бюджета…" },
  { label: "Желаемые сроки готовности", pending: "Ожидание сроков…" },
];

const TOTAL = SPEC_FIELDS.length;

export function Larkins() {
  const [messages, setMessages] = useState<DisplayMessage[]>([
    { id: 0, role: "assistant", content: LARKINS_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  // Offer transmitted to the team — switches the spec panel to its conclusion.
  const [sent, setSent] = useState(false);
  // Increments on each secret phrase — drives the orb pulse via framer key.
  const [pulse, setPulse] = useState(0);

  // Off-the-record exchanges don't count toward the brief.
  const answers = messages
    .filter((m) => m.role === "user" && !m.secret)
    .map((m) => m.content.trim());
  const filled = Math.min(answers.length, TOTAL);
  const percent = Math.round((filled / TOTAL) * 100);

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
          content: "Связь прервалась. Напишите нам в Telegram — мы на связи.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function submit() {
    if (!done) return;
    setSent(true);
    setPulse((p) => p + 1);
  }

  function reset() {
    setMessages([
      { id: idRef.current++, role: "assistant", content: LARKINS_GREETING },
    ]);
    setDone(false);
    setSent(false);
    setInput("");
  }

  const statusLabel = busy
    ? "печатает…"
    : sent
      ? "оффер передан"
      : done
        ? "бриф укомплектован"
        : "внимательно слушает";

  return (
    <Section id="larkins-brief" divided>
      <div className="flex flex-col gap-9 lg:gap-12">
        <SectionHeading
          eyebrow="06 — Larkins AI"
          title="Не чат-бот. <em>Слой интеллекта</em>"
          description="Larkins задаёт правильные вопросы, собирает бриф и в реальном времени складывает из него коммерческое предложение. Спокойно, по делу, без канцелярщины."
        />

        <Reveal delay={0.08}>
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            {/* ── Chat console ───────────────────────────────── */}
            <div className="flex h-[520px] flex-col overflow-hidden rounded-2xl surface shadow-lift lg:h-[600px]">
              {/* Header — orb, identity, offer progress */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <Orb pulse={pulse} done={sent} />
                  <div className="flex flex-col leading-tight">
                    <span className="font-display text-lg">Larkins AI</span>
                    <span className="t-meta text-[0.58rem] text-accent">
                      {statusLabel}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="t-meta text-[0.55rem] text-text-faint">
                    Прогресс оффера
                  </span>
                  <span
                    className="h-1.5 w-16 overflow-hidden rounded-full bg-bg-tertiary"
                    aria-hidden="true"
                  >
                    <motion.span
                      className="block h-full rounded-full bg-accent"
                      initial={false}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>
                  <span className="t-mono w-9 text-right text-sm font-medium text-accent">
                    {percent}%
                  </span>
                </div>
              </div>

              {/* Terminal sub-header */}
              <div className="flex items-center justify-between bg-bg px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ec6a5e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#61c554]" />
                  </span>
                  <span className="t-mono text-xs text-text-faint">
                    larkins-console.sh
                  </span>
                </div>
                <span className="t-mono text-[0.7rem] text-text-faint">
                  status: {busy ? "processing" : "online"}
                </span>
              </div>

              {/* Message log */}
              <div
                ref={logRef}
                className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden bg-bg px-4 py-4"
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
                        "max-w-[88%] whitespace-pre-line break-words [overflow-wrap:anywhere] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
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

              {/* Composer / actions */}
              <div className="border-t border-border p-3">
                {sent ? (
                  <div className="flex flex-col items-center gap-2.5 py-1 text-center">
                    <span className="t-meta text-[0.6rem] text-accent">
                      Оффер успешно передан
                    </span>
                    <button
                      type="button"
                      onClick={reset}
                      className="flex w-full items-center justify-center gap-2 rounded-xl
                                 border border-border py-3 text-sm text-text-muted cursor-pointer
                                 transition-colors hover:border-border-strong hover:text-accent"
                    >
                      <Icon name="spark" size={15} />
                      Составить новый оффер
                    </button>
                  </div>
                ) : done ? (
                  <div className="flex flex-col gap-3">
                    <span className="t-meta text-center text-[0.55rem] leading-relaxed text-text-faint">
                      Все вопросы пройдены. Спецификация готова к передаче.
                    </span>
                    <div className="flex gap-2.5">
                      <button
                        type="button"
                        onClick={reset}
                        className="rounded-xl border border-border px-4 py-3 text-sm text-text-muted
                                   cursor-pointer transition-colors hover:border-border-strong hover:text-text"
                      >
                        Сбросить
                      </button>
                      <button
                        type="button"
                        onClick={submit}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl
                                   bg-accent py-3 text-sm font-medium text-accent-ink cursor-pointer
                                   transition-colors hover:bg-accent-light"
                      >
                        <Icon name="send" size={15} />
                        Отправить на обработку
                      </button>
                    </div>
                  </div>
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
                      placeholder="Напишите ваш ответ в свободной форме…"
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

            {/* ── Commercial proposal / conclusion ─────────────── */}
            <div className="flex h-[520px] flex-col overflow-hidden rounded-2xl surface shadow-lift lg:h-[600px]">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <Conclusion key="done" answers={answers} onReset={reset} />
                ) : (
                  <motion.div
                    key="spec"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full flex-col"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="t-meta text-[0.58rem] text-text-faint">
                          Спецификация
                        </span>
                        <h3 className="font-display text-xl leading-tight">
                          B2B Коммерческое Предложение
                        </h3>
                      </div>
                      <span
                        className={cn(
                          "t-meta shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.5rem]",
                          done
                            ? "border-accent bg-accent-soft text-accent"
                            : "border-border text-text-faint",
                        )}
                      >
                        {done ? "Сформировано" : `Сбор данных: ${filled}/${TOTAL}`}
                      </span>
                    </div>

                    {/* Fields */}
                    <ul className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                      {SPEC_FIELDS.map((field, i) => {
                        const value = answers[i];
                        const isFilled = i < filled;
                        return (
                          <li
                            key={field.label}
                            className="flex flex-col gap-2 border-b border-border px-5 py-3.5 last:border-b-0"
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={cn(
                                  "grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[0.6rem] transition-colors duration-500",
                                  isFilled
                                    ? "border-accent bg-accent text-accent-ink"
                                    : "border-border text-text-faint",
                                )}
                              >
                                {isFilled ? (
                                  <Icon name="check" size={11} />
                                ) : (
                                  i + 1
                                )}
                              </span>
                              <span
                                className={cn(
                                  "t-meta text-[0.55rem] transition-colors duration-500",
                                  isFilled ? "text-accent" : "text-text-faint/70",
                                )}
                              >
                                {field.label}
                              </span>
                            </div>

                            <AnimatePresence mode="wait" initial={false}>
                              <motion.p
                                key={isFilled ? "v" : "p"}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className={cn(
                                  "break-words [overflow-wrap:anywhere] pl-[1.95rem] text-sm leading-relaxed",
                                  isFilled
                                    ? "text-text"
                                    : "italic text-text-faint/60",
                                )}
                              >
                                {isFilled ? value : field.pending}
                              </motion.p>
                            </AnimatePresence>

                            {/* Derived B2B context tag on the business field */}
                            {i === 1 && isFilled && (
                              <span className="ml-[1.95rem] inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-2.5 py-1 t-meta text-[0.48rem] text-accent">
                                <span className="h-1 w-1 rounded-full bg-accent" />
                                Локальный B2B проект
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>

                    {/* Footer — note while collecting, CTA once formed */}
                    <div className="border-t border-border p-4">
                      {done ? (
                        <button
                          type="button"
                          onClick={submit}
                          className="flex w-full items-center justify-center gap-2 rounded-xl
                                     bg-accent py-3.5 text-sm font-medium text-accent-ink cursor-pointer
                                     transition-colors hover:bg-accent-light"
                        >
                          <Icon name="spark" size={16} />
                          Передать оффер команде
                        </button>
                      ) : (
                        <p className="text-center text-xs leading-relaxed text-text-faint">
                          Продолжайте общение с Larkins. Коммерческое предложение
                          сформируется автоматически после завершения брифа.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/** Glowing amber identity orb. Pulses on each `pulse` increment. */
function Orb({ pulse, done }: { pulse: number; done: boolean }) {
  return (
    <motion.span
      key={pulse}
      initial={{ scale: 1, boxShadow: "0 0 0 0 rgba(212,160,23,0)" }}
      animate={
        pulse > 0
          ? {
              scale: [1, 1.18, 1],
              boxShadow: [
                "0 0 0 0 rgba(212,160,23,0.5)",
                "0 0 0 12px rgba(212,160,23,0)",
                "0 0 0 0 rgba(212,160,23,0)",
              ],
            }
          : undefined
      }
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full
                 bg-gradient-to-br from-accent-light to-accent text-accent-ink
                 shadow-[0_0_22px_-4px_var(--glow)]"
    >
      <Icon name={done ? "check" : "spark"} size={18} />
    </motion.span>
  );
}

/** Conclusion panel — shown once the offer is transmitted (image-4). */
function Conclusion({
  answers,
  onReset,
}: {
  answers: string[];
  onReset: () => void;
}) {
  const rows: { label: string; value: string; accent?: boolean }[] = [
    { label: "Тип проекта", value: answers[0] || "—" },
    { label: "Отрасль", value: "Локальный B2B проект", accent: true },
    {
      label: "Инвестиции / Сроки",
      value: `${answers[3] || "—"} / ${answers[4] || "—"}`,
      accent: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full flex-col items-center overflow-y-auto px-6 py-8 text-center"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="grid h-16 w-16 place-items-center rounded-full
                   bg-gradient-to-br from-accent-light to-accent text-accent-ink
                   shadow-[0_0_36px_-6px_var(--glow)]"
      >
        <Icon name="check" size={30} />
      </motion.span>

      <h3 className="font-display mt-6 text-2xl leading-tight">
        Оффер передан инженерам!
      </h3>
      <p className="t-body mt-3 text-sm text-text-muted">
        Мы получили вашу спецификацию и B2B контекст. Дежурный архитектор Lark
        Freelance приступил к детальному анализу. Свяжемся с вами в течение часа
        с готовой сметой.
      </p>

      {/* Transmission details */}
      <div className="mt-7 w-full">
        <span className="t-meta flex items-center gap-2.5 text-[0.55rem] text-text-faint">
          Детали трансляции
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </span>
        <dl className="mt-3 flex flex-col gap-2.5 text-left">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 border-b border-border pb-2.5 last:border-b-0"
            >
              <dt className="t-meta shrink-0 text-[0.52rem] text-text-faint">
                {row.label}
              </dt>
              <dd
                className={cn(
                  "min-w-0 flex-1 truncate text-right text-sm font-medium",
                  row.accent ? "text-accent" : "text-text",
                )}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Actions */}
      <div className="mt-auto flex w-full gap-2.5 pt-7">
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-border px-5 py-3 text-sm text-text-muted
                     cursor-pointer transition-colors hover:border-border-strong hover:text-text"
        >
          Сбросить
        </button>
        <a
          href={contact.telegram.url}
          target="_blank"
          rel="noopener noreferrer"
          data-magnet="telegram"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl
                     bg-accent py-3 text-sm font-medium text-accent-ink cursor-pointer
                     transition-colors hover:bg-accent-light"
        >
          <Icon name="telegram" size={16} />
          Написать в Telegram
        </a>
      </div>
    </motion.div>
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
