"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  /** Not built yet — rendered muted and non-clickable. */
  soon?: boolean;
}

const NAV: NavItem[] = [
  { href: "/admin", label: "Дашборд", icon: "layers" },
  { href: "/admin/leads", label: "Заявки", icon: "send", soon: true },
  { href: "/admin/portfolio", label: "Портфолио", icon: "code", soon: true },
  { href: "/admin/team", label: "Команда", icon: "user", soon: true },
  { href: "/admin/services", label: "Услуги", icon: "circuit", soon: true },
  { href: "/admin/faq", label: "FAQ", icon: "spark", soon: true },
  { href: "/admin/settings", label: "Настройки", icon: "shield", soon: true },
];

interface AdminSidebarProps {
  user: { name?: string | null; email?: string | null; role: "ADMIN" | "EDITOR" };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="flex shrink-0 flex-col gap-6 border-b border-border bg-bg-secondary p-4
                 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:p-5"
    >
      {/* Brand */}
      <Link href="/admin" className="flex items-center gap-2.5">
        <span
          className="grid h-9 w-9 place-items-center rounded-full
                     bg-gradient-to-br from-accent-light to-accent text-accent-ink
                     shadow-[0_0_20px_-6px_var(--glow)]"
        >
          <Icon name="spark" size={17} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-display text-lg">Lark Admin</span>
          <span className="t-meta text-[0.5rem] text-text-faint">
            Панель управления
          </span>
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex flex-1 flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          if (item.soon) {
            return (
              <span
                key={item.href}
                className="flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm
                           text-text-faint/60 cursor-not-allowed"
                title="Скоро"
              >
                <Icon name={item.icon} size={17} />
                <span className="whitespace-nowrap">{item.label}</span>
                <span className="t-meta ml-auto hidden text-[0.45rem] text-text-faint/50 lg:inline">
                  скоро
                </span>
              </span>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-accent-soft text-accent"
                  : "text-text-muted hover:bg-bg-tertiary hover:text-text",
              )}
            >
              <Icon name={item.icon} size={17} />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User + sign out */}
      <div className="hidden flex-col gap-3 border-t border-border pt-4 lg:flex">
        <div className="flex flex-col leading-tight">
          <span className="truncate text-sm text-text">
            {user.name || user.email}
          </span>
          <span className="t-meta text-[0.5rem] text-text-faint">
            {user.role === "ADMIN" ? "Администратор" : "Редактор"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center justify-center gap-2 rounded-xl border border-border py-2.5
                     text-sm text-text-muted cursor-pointer transition-colors
                     hover:border-border-strong hover:text-text"
        >
          <Icon name="arrow-right" size={15} className="rotate-180" />
          Выйти
        </button>
      </div>
    </aside>
  );
}
