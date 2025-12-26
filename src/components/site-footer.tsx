import Logo from "@/components/logo";

export default function SiteFooter() {
  return (
    <footer className="relative w-full px-[clamp(1.25rem,4vw,4rem)] pb-14 pt-12">
      <div className="rounded-3xl border border-card-border bg-card p-7 backdrop-blur">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <div className="flex flex-wrap gap-3 text-sm text-muted">
            <a href="#servicos" className="hover:text-foreground">
              Serviços
            </a>
            <a href="#plataforma" className="hover:text-foreground">
              Soluções
            </a>
            <a href="#stack" className="hover:text-foreground">
              Stack
            </a>
            <a href="#cases" className="hover:text-foreground">
              Casos
            </a>
            <a href="#contato" className="hover:text-foreground">
              Contato
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-card-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ITFACT - IT SOLUTIONS. Todos os direitos reservados.</p>
          <p className="text-muted">
            DevSecOps • IA • Plataforma • Observabilidade
          </p>
        </div>
      </div>
    </footer>
  );
}
