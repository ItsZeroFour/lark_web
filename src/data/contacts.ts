/**
 * Single source of truth for contact details.
 * Swap these values to update the whole site (header, contact section, footer,
 * structured data). The phone below is a placeholder — replace with the real
 * number when available.
 */

export const contact = {
  telegram: {
    handle: "@lark_freelance",
    url: "https://t.me/lark_freelance",
  },
  phone: {
    /** Display form. */
    label: "+7 (978) 679-10-16",
    /** tel: form — digits only with leading +. */
    href: "tel:+79786791016",
  },
  email: {
    label: "hello@larkfreelance.dev",
    href: "mailto:hello@larkfreelance.dev",
  },
  /** For freelancer applications. */
  joinEmail: {
    label: "join@larkfreelance.dev",
    href: "mailto:join@larkfreelance.dev",
  },
  location: "Крым · работаем удалённо",
  /** Typical first-response time — used as a conversion signal. */
  responseTime: "за 15 минут",
} as const;
