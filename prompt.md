# Claude Prompt — Lark Freelance Website (Unified Master Prompt)

> Используй этот документ как единый источник правды для проектирования и разработки сайта Lark Freelance.  
> Твоя задача — создать полноценный premium-level React-сайт с архитектурой production-уровня, продуманным UI/UX, масштабируемой структурой проекта и атмосферой “private tech unit”.

---

# I. Главная задача проекта

Создай сайт для **Lark Freelance** — AI-enhanced digital agency / elite execution unit нового поколения.

Это НЕ:

- фриланс-биржа,
- шаблонное digital-агентство,
- SaaS-лендинг,
- crypto/web3 стартап,
- “AI startup” с кричащим маркетингом.

Это:

- modern tech command center,
- premium digital operations team,
- AI-native execution ecosystem,
- интеллектуальная digital-команда с собственной системой мышления.

Главная эмоция:

> “Мы получили доступ к сильной современной digital-команде.”

---

# II. Технологический стек (ОБЯЗАТЕЛЬНО)

## Использовать:

- React 18
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- CSS Variables
- Responsive-first architecture

## Архитектура проекта — ОБЯЗАТЕЛЬНО

Сайт НЕ должен быть одним файлом.

Нужна production-grade структура:

```bash
src/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── larkins/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   │
│   ├── hero/
│   │   ├── Hero.tsx
│   │   ├── HeroBackground.tsx
│   │   └── HeroOrb.tsx
│   │
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Team.tsx
│   │   ├── Larkins.tsx
│   │   └── Freelancers.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── Glow.tsx
│   │   └── NoiseOverlay.tsx
│   │
│   └── animations/
│       ├── Reveal.tsx
│       ├── MagneticButton.tsx
│       └── AmbientMotion.tsx
│
├── data/
│   ├── portfolio.ts
│   ├── team.ts
│   └── services.ts
│
├── hooks/
│   ├── useTheme.ts
│   ├── useReveal.ts
│   └── useMagnetic.ts
│
├── lib/
│   ├── claude.ts
│   └── utils.ts
│
├── styles/
│   ├── variables.css
│   ├── animations.css
│   └── typography.css
│
└── public/
    ├── images/
    ├── icons/
    └── noise/
```

---

# III. Общий визуальный язык

## Визуальный стиль

Сайт должен ощущаться как:

- premium dark tech aesthetic,
- cinematic minimalism,
- AI-native interface,
- futuristic but restrained,
- expensive and intelligent.

## Референсы по вайбу

- Linear
- Vercel
- Arc
- Nothing
- Replit
- early OpenAI
- современные premium AI-продукты

---

# IV. Палитра и дизайн-система

## Цвета

```css
:root {
  --bg: #0b0b0c;
  --bg-secondary: #121214;
  --bg-tertiary: #1a1a1d;

  --text: #f3efe8;
  --text-muted: #8d887f;

  --accent: #d4a017;
  --accent-light: #f0b040;
  --accent-glow: rgba(212, 160, 23, 0.3);

  --border: rgba(255, 255, 255, 0.08);
}
```

## Важно

Жёлтый должен быть:

- глубоким,
- intelligent,
- luminous amber,
- НЕ flat yellow.

---

# V. Типографика

## Шрифты

### Заголовки

- DM Serif Display
- italic accents
- cinematic luxury feeling

### Body/UI

- Geologica или Onest

### Meta/code

- JetBrains Mono

---

# VI. Главная атмосфера сайта

Сайт НЕ должен быть:

- стерильным,
- пустым,
- flat,
- generic.

Нужны:

- subtle infrastructure grid,
- cinematic depth,
- procedural glow,
- noise texture,
- soft gradients,
- ambient movement,
- controlled imperfection.

---

# VII. Motion System

## Анимации должны быть:

- медленными,
- дорогими,
- intentional,
- atmospheric.

## Использовать:

- Framer Motion
- stagger reveal
- scroll-based transitions
- glow pulse
- subtle parallax
- ambient floating
- magnetic hover
- cinematic fade

## НЕ использовать:

- хаотичный motion,
- aggressive cyberpunk,
- excessive glow,
- overloaded animations.

---

# VIII. HERO Section (КРИТИЧЕСКИ ВАЖНО)

## Hero должен вызывать wow-эффект.

### Левая часть

```txt
[метка]
IT-агентство нового поколения

[H1]
Цифровые решения,
которые работают.

[подзаголовок]
Стратегия, дизайн и AI-execution
в одной команде.
Для бизнеса, который думает вперёд.
```

## CTA

Primary:

```txt
Обсудить проект →
```

Secondary:

```txt
Смотреть работы
```

## Правая часть

Создать:

- AI Orb,
- procedural glowing sphere,
- neural pulse system,
- intelligence presence.

Orb должен:

- дышать,
- пульсировать,
- слегка двигаться,
- ощущаться как “живой AI-core”.

## Hero Background

Добавить:

- cinematic grid,
- subtle noise,
- soft atmosphere,
- depth gradients,
- animated infrastructure lines,
- intelligent UI atmosphere.

---

# IX. Полная структура сайта

## Главная страница

```txt
/
├── Hero
├── Кто мы
├── Услуги
├── Как мы работаем
├── Портфолио
├── Команда
├── Larkins
├── Для фрилансеров
└── Footer
```

## Отдельная страница

```txt
/larkins
```

---

# X. Секции сайта

---

## 1. HERO

Задача:

- захватить внимание за 3 секунды,
- показать premium execution quality,
- вызвать желание начать диалог.

---

## 2. КТО МЫ

Заголовок:

```txt
Единственная команда в Крыму,
которая делает живые цифровые продукты
```

Текст:

- без корпоративного мусора,
- без “молодая амбициозная команда”.

---

## 3. УСЛУГИ

Карточки:

- Web Development
- AI Automation
- IT под ключ
- Larkins AI

Карточка Larkins:

- amber border,
- subtle pulse,
- coming soon feeling.

---

## 4. PROCESS

Timeline:

- consultation,
- strategy,
- development,
- launch.

Motion:

- line reveal,
- progressive scroll animation.

---

## 5. PORTFOLIO

Grid:

- premium cards,
- hover reveal,
- cinematic overlays.

Фильтры:

- Все
- Веб-разработка
- AI
- Геймификация
- Кейсы

---

## 6. TEAM

4 карточки:

- Игорь
- Даниил
- Михаил
- Илья

Под каждой:
НЕ должность.

А:

- “Думает экосистемами”
- “Делает так чтобы работало”
- и т.д.

---

## 7. LARKINS AI

Это НЕ gimmick chatbot.

Это:

> intelligence layer.

## Интерфейс:

- premium AI console,
- dark glass UI,
- living orb,
- subtle reactions.

## Системный промпт

```ts
const LARKINS_SYSTEM = `
Ты — Larkins, AI-ассистент агентства Lark Freelance.

Твоя задача:
дружелюбно и кратко собрать бриф клиента.

Последовательно задай 5 вопросов:

1. Что нужно сделать?
2. Для какого бизнеса?
3. Есть ли референсы?
4. Бюджет?
5. Сроки?

После — выведи краткое саммари
и сообщи что команда свяжется в течение часа.

Тон:
спокойный,
живой,
без канцелярщины,
без смайликов.
`;
```

---

## 8. ДЛЯ ФРИЛАНСЕРОВ

Отдельная атмосфера секции.

Идея:

> “Летим вместе.”

Секция должна ощущаться как:

- private invitation,
- selective community,
- growth environment.

---

## 9. FOOTER

Минималистичный.

Слоган:

```txt
Расправь свои крылья
```

---

# XI. Страница /larkins

Полноэкранный cinematic experience.

## Атмосфера:

- almost black background,
- sleeping AI orb,
- ambient motion,
- “coming soon”.

## Центр:

```txt
LARKINS
coming soon

AI-ассистент нового поколения
для вашего бизнеса.
```

---

# XII. Responsive Design (ОБЯЗАТЕЛЬНО)

Полная mobile-first адаптация.

## Breakpoints:

- 1440+
- 1024
- 768
- 480

## Mobile:

- burger menu,
- stacked layout,
- full-width cards,
- adaptive typography через clamp(),
- optimized motion.

---

# XIII. Accessibility

Обязательно:

- aria-labels,
- semantic HTML,
- keyboard navigation,
- contrast compliance.

---

# XIV. Performance

Важно:

- минимальный DOM,
- lazy reveal,
- optimized motion,
- no layout thrashing,
- smooth 60fps feel.

---

# XV. Чего НЕЛЬЗЯ делать

НЕ:

- stock photos,
- blue SaaS buttons,
- startup clichés,
- generic cards,
- loud AI marketing,
- cyberpunk overload,
- “young ambitious team”,
- sterile corporate feeling.

---

# XVI. Финальное ощущение

Посетитель должен чувствовать:

НЕ:

> “мы нашли подрядчика”

А:

> “мы получили доступ к сильной технологической команде нового поколения.”

---

# XVII. ВАЖНО — ФОРМАТ РЕЗУЛЬТАТА

Сгенерируй:

1. Полный production-ready React/Next.js проект.
2. Все файлы отдельно.
3. Полную файловую структуру.
4. TypeScript-код.
5. Tailwind стили.
6. Framer Motion анимации.
7. Responsive layout.
8. Темную и светлую тему.
9. Все компоненты разложенными по папкам.
10. Чистый и масштабируемый код.

НЕ делай:

- giant monolithic component,
- single-file app,
- spaghetti architecture.

Код должен выглядеть как работа senior-level product team.
