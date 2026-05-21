/** Portfolio cases with filterable categories. */

export type PortfolioCategory = "web" | "ai" | "gamification" | "case";

export interface PortfolioFilter {
  id: PortfolioCategory | "all";
  label: string;
}

export const portfolioFilters: PortfolioFilter[] = [
  { id: "all", label: "Все" },
  { id: "web", label: "Веб-разработка" },
  { id: "ai", label: "AI" },
  { id: "gamification", label: "Геймификация" },
  { id: "case", label: "Кейсы" },
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  summary: string;
  year: string;
  /** Two-stop gradient used for the cinematic cover. */
  cover: [string, string];
}

export const portfolio: PortfolioItem[] = [
  {
    id: "atlas",
    title: "Atlas Platform",
    category: "web",
    categoryLabel: "Веб-разработка",
    summary:
      "Продуктовая платформа с дизайн-системой и аналитическим ядром для растущего B2B-сервиса.",
    year: "2025",
    cover: ["#1a1a1d", "#2a2418"],
  },
  {
    id: "signal",
    title: "Signal Assistant",
    category: "ai",
    categoryLabel: "AI",
    summary:
      "AI-ассистент поддержки, который закрывает 70% обращений без участия человека.",
    year: "2025",
    cover: ["#161616", "#2d2410"],
  },
  {
    id: "orbit",
    title: "Orbit Quest",
    category: "gamification",
    categoryLabel: "Геймификация",
    summary:
      "Геймифицированный онбординг с прогрессией и наградами — вовлечённость выросла вдвое.",
    year: "2024",
    cover: ["#181818", "#26221a"],
  },
  {
    id: "meridian",
    title: "Meridian Rebuild",
    category: "case",
    categoryLabel: "Кейс",
    summary:
      "Полная пересборка IT-инфраструктуры под ключ: от архитектуры до запуска за 9 недель.",
    year: "2024",
    cover: ["#1a1a1d", "#2a2615"],
  },
  {
    id: "pulse",
    title: "Pulse Analytics",
    category: "web",
    categoryLabel: "Веб-разработка",
    summary:
      "Аналитический дашборд реального времени с плотной, но спокойной подачей данных.",
    year: "2025",
    cover: ["#151515", "#282010"],
  },
  {
    id: "warden",
    title: "Warden Agent",
    category: "ai",
    categoryLabel: "AI",
    summary:
      "Автономный агент мониторинга, который сам диагностирует и эскалирует инциденты.",
    year: "2025",
    cover: ["#171717", "#2c2412"],
  },
];
