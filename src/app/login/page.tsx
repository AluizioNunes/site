"use client";

import AmbientBackground from "@/components/ambient-background";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { useState } from "react";

export default function LoginPage() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientBackground />
      <SiteHeader />
      <main className="relative w-full px-[clamp(1.25rem,4vw,4rem)] pb-24 pt-20">
        <section className="mx-auto w-full max-w-md rounded-3xl border border-card-border bg-card p-8 backdrop-blur">
          <h1 className="text-2xl font-semibold tracking-tight">Acesso</h1>
          <p className="mt-2 text-sm text-muted">
            Faça login para acessar recursos internos.
          </p>

          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("submitted");
            }}
          >
            <label className="grid gap-2 text-sm">
              <span className="font-semibold">Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="h-11 rounded-2xl border border-card-border bg-background px-4 text-foreground outline-none ring-0 focus:border-white/40"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="font-semibold">Senha</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="h-11 rounded-2xl border border-card-border bg-background px-4 text-foreground outline-none ring-0 focus:border-white/40"
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Entrar
            </button>
          </form>

          {status === "submitted" && (
            <div className="mt-5 rounded-2xl border border-card-border bg-black/25 p-4 text-sm text-muted">
              Login ainda não está configurado. Esta tela já está pronta para
              integrar autenticação quando você definir a regra de acesso.
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

