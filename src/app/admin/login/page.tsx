"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Icon } from "@/components/ui/Icon";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const res = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
    });

    setBusy(false);
    if (res?.error) {
      setError("Неверный email или пароль.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-bg px-5">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span
            className="grid h-12 w-12 place-items-center rounded-full
                       bg-gradient-to-br from-accent-light to-accent text-accent-ink
                       shadow-[0_0_28px_-6px_var(--glow)]"
          >
            <Icon name="spark" size={22} />
          </span>
          <div>
            <h1 className="font-display text-2xl">Lark Admin</h1>
            <p className="t-meta mt-1 text-[0.58rem] text-text-faint">
              Панель управления
            </p>
          </div>
        </div>

        {/* Card */}
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 rounded-2xl surface p-6 shadow-lift"
        >
          <label className="flex flex-col gap-1.5">
            <span className="t-meta text-[0.55rem] text-text-muted">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="rounded-xl border border-border bg-bg px-3.5 py-3 text-sm text-text
                         outline-none placeholder:text-text-faint focus:border-accent"
              placeholder="you@larkfreelance.dev"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="t-meta text-[0.55rem] text-text-muted">Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="rounded-xl border border-border bg-bg px-3.5 py-3 text-sm text-text
                         outline-none placeholder:text-text-faint focus:border-accent"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="text-sm text-[#ec6a5e]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-accent py-3
                       text-sm font-medium text-accent-ink cursor-pointer
                       transition-colors hover:bg-accent-light
                       disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Вход…" : "Войти"}
            {!busy && <Icon name="arrow-right" size={16} />}
          </button>
        </form>
      </div>
    </main>
  );
}
