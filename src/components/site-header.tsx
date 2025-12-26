"use client";

import Logo from "@/components/logo";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NavItem = { label: string; href: string };

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: "Serviços", href: "#servicos" },
      { label: "Soluções", href: "#plataforma" },
      { label: "Stack", href: "#stack" },
      { label: "Casos", href: "#cases" },
      { label: "Contato", href: "#contato" },
    ],
    [],
  );

  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-card-border bg-background/40 backdrop-blur">
      <div className="flex w-full items-center justify-between px-[clamp(1.25rem,4vw,4rem)] py-4">
        <Logo />

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Falar com especialista
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-card text-foreground backdrop-blur md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden"
          >
            <div className="absolute inset-x-0 top-full border-b border-card-border bg-background/80 backdrop-blur">
              <div className="px-[clamp(1.25rem,4vw,4rem)] pb-6 pt-4">
                <div className="grid gap-3">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl border border-card-border bg-card px-4 py-3 text-sm font-semibold text-foreground backdrop-blur"
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="#contato"
                    className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black"
                  >
                    Falar com especialista
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
