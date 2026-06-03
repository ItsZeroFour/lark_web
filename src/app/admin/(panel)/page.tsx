import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Icon, type IconName } from "@/components/ui/Icon";

// Always read fresh counts.
export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  NEW: "Новые",
  IN_PROGRESS: "В работе",
  PROPOSAL_SENT: "КП отправлено",
  WON: "Выиграны",
  LOST: "Закрыты",
};

export default async function DashboardPage() {
  // Lead stats — lights up once briefs start landing (iteration 2).
  const [total, grouped] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ["status"], _count: true }),
  ]);

  const byStatus = Object.fromEntries(
    grouped.map((g) => [g.status, g._count]),
  ) as Record<string, number>;

  const stats: { label: string; value: number; icon: IconName }[] = [
    { label: "Всего заявок", value: total, icon: "layers" },
    { label: STATUS_LABELS.NEW, value: byStatus.NEW ?? 0, icon: "spark" },
    {
      label: STATUS_LABELS.IN_PROGRESS,
      value: byStatus.IN_PROGRESS ?? 0,
      icon: "clock",
    },
    { label: STATUS_LABELS.WON, value: byStatus.WON ?? 0, icon: "check" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <span className="t-meta text-[0.58rem] text-text-faint">Обзор</span>
        <h1 className="font-display text-3xl">Дашборд</h1>
        <p className="text-sm text-text-muted">
          Сводка по заявкам и контенту. Дальше подключим управление лидами из
          Larkins и редактирование контента сайта.
        </p>
      </header>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-3 rounded-2xl surface p-5 shadow-lift"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
              <Icon name={s.icon} size={17} />
            </span>
            <span className="font-display text-3xl">{s.value}</span>
            <span className="t-meta text-[0.55rem] text-text-muted">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Next steps */}
      <div className="rounded-2xl surface p-6 shadow-lift">
        <h2 className="font-display text-lg">Что дальше</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {[
            "Сохранение заявок Larkins в базу и их просмотр",
            "Воронка статусов и уведомления о новых лидах",
            "Редактирование портфолио, команды, услуг и FAQ",
          ].map((line) => (
            <li
              key={line}
              className="flex items-start gap-2.5 text-sm text-text-muted"
            >
              <Icon
                name="arrow-right"
                size={15}
                className="mt-0.5 shrink-0 text-accent"
              />
              {line}
            </li>
          ))}
        </ul>
        <Link
          href="/"
          target="_blank"
          className="mt-5 inline-flex items-center gap-2 text-sm text-text-faint
                     transition-colors hover:text-accent"
        >
          <Icon name="arrow-up-right" size={15} />
          Открыть сайт
        </Link>
      </div>
    </div>
  );
}
