/** The execution unit. Captions describe how someone thinks — never a title. */

export interface TeamMember {
  id: string;
  name: string;
  caption: string;
  /** A short trait line surfaced on hover. */
  trait: string;
  /** Monogram shown in the avatar plate. */
  monogram: string;
}

export const team: TeamMember[] = [
  {
    id: "igor",
    name: "Игорь",
    caption: "Думает экосистемами",
    trait: "Видит продукт целиком — связи, а не отдельные экраны.",
    monogram: "ИГ",
  },
  {
    id: "daniil",
    name: "Даниил",
    caption: "Делает так, чтобы работало",
    trait: "Доводит до состояния, когда система просто работает.",
    monogram: "ДН",
  },
  {
    id: "mikhail",
    name: "Михаил",
    caption: "Превращает идеи в интерфейсы",
    trait: "Чувствует форму, ритм и тишину между элементами.",
    monogram: "МХ",
  },
  {
    id: "ilya",
    name: "Илья",
    caption: "Учит продукты думать",
    trait: "Встраивает интеллект там, где раньше была рутина.",
    monogram: "ИЛ",
  },
];
