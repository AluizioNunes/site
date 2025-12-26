"use client";

import { Loader2, Send } from "lucide-react";
import { useId, useMemo, useState } from "react";

type SubmitState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);
  const formId = useId();

  const isBusy = state === "sending";
  const isSuccess = state === "success";

  const buttonLabel = useMemo(() => {
    if (state === "sending") return "Enviando...";
    if (state === "success") return "Enviado!";
    return "Enviar";
  }, [state]);

  async function onSubmit(formData: FormData) {
    setState("sending");
    setError(null);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error || "Não foi possível enviar agora.");
      }

      setState("success");
    } catch (e) {
      setState("error");
      setError(e instanceof Error ? e.message : "Erro inesperado.");
    }
  }

  return (
    <form
      action={onSubmit}
      className="rounded-3xl border border-card-border bg-card p-7 backdrop-blur"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-semibold">Nome</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="h-11 rounded-2xl border border-card-border bg-black/30 px-4 text-sm text-foreground outline-none ring-0 placeholder:text-muted focus:border-white/30"
            placeholder="Seu nome"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-semibold">Email</span>
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            className="h-11 rounded-2xl border border-card-border bg-black/30 px-4 text-sm text-foreground outline-none ring-0 placeholder:text-muted focus:border-white/30"
            placeholder="voce@empresa.com"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm">
        <span className="font-semibold">Empresa</span>
        <input
          name="company"
          className="h-11 rounded-2xl border border-card-border bg-black/30 px-4 text-sm text-foreground outline-none ring-0 placeholder:text-muted focus:border-white/30"
          placeholder="Nome da empresa"
        />
      </label>

      <label className="mt-4 grid gap-2 text-sm">
        <span className="font-semibold">Mensagem</span>
        <textarea
          name="message"
          required
          rows={5}
          className="min-h-[132px] resize-none rounded-2xl border border-card-border bg-black/30 px-4 py-3 text-sm text-foreground outline-none ring-0 placeholder:text-muted focus:border-white/30"
          placeholder="Conte seu objetivo (DevSecOps, IA, pipelines, plataforma, observabilidade...)"
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted">
          <span className="font-semibold text-foreground">Resposta rápida</span>{" "}
          em horário comercial.
        </div>
        <button
          type="submit"
          disabled={isBusy || isSuccess}
          aria-describedby={`${formId}-status`}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition disabled:opacity-60"
        >
          {isBusy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {buttonLabel}
        </button>
      </div>

      <div
        id={`${formId}-status`}
        className="mt-4 text-sm"
        aria-live="polite"
      >
        {state === "success" && (
          <p className="text-brand-2">
            Mensagem enviada. Em breve entramos em contato.
          </p>
        )}
        {state === "error" && <p className="text-red-300">{error}</p>}
      </div>
    </form>
  );
}

