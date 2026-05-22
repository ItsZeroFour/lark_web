/** The four-stage working process rendered as a timeline. */

import type { IconName } from "@/components/ui/Icon";

export interface ProcessStage {
  id: string;
  index: string;
  title: string;
  description: string;
  marker: string;
  /** Stage glyph — drawn large and faint as a watermark on the card. */
  icon: IconName;
}

export const processStages: ProcessStage[] = [
  {
    id: "consultation",
    index: "01",
    title: "Консультация",
    description:
      "Слушаем задачу без шаблонов. Разбираем контекст, ограничения и то, что на самом деле важно бизнесу.",
    marker: "diagnose",
    icon: "circuit",
  },
  {
    id: "strategy",
    index: "02",
    title: "Стратегия",
    description:
      "Собираем архитектуру решения: что строим, в каком порядке и почему именно так.",
    marker: "architect",
    icon: "layers",
  },
  {
    id: "development",
    index: "03",
    title: "Разработка",
    description:
      "Делаем — короткими видимыми итерациями. Вы видите продукт по мере того, как он оживает.",
    marker: "execute",
    icon: "code",
  },
  {
    id: "launch",
    index: "04",
    title: "Запуск",
    description:
      "Выводим в прод, стабилизируем, передаём управление. Остаёмся рядом для развития.",
    marker: "ship",
    icon: "send",
  },
];
