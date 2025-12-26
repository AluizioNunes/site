import AmbientBackground from "@/components/ambient-background";
import ContactForm from "@/components/contact-form";
import Section from "@/components/section";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import fortinetLogo from "@/assets/images/Fortinet - Logo.jpg";
import nutanixLogo from "@/assets/images/Nutanix.png";
import Image from "next/image";
import {
  ArrowRight,
  Brain,
  Cloud,
  GitBranch,
  Lock,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const partners = [
    { name: "Fortinet", logo: fortinetLogo },
    { name: "Nutanix", logo: nutanixLogo },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientBackground />
      <SiteHeader />
      <main className="relative w-full px-[clamp(1.25rem,4vw,4rem)] pb-24 pt-20">
        <section className="grid items-center gap-10 pb-16 pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-3 py-1 text-xs text-muted backdrop-blur">
              <Sparkles className="h-4 w-4 text-brand" />
              DevSecOps & IA para escala, segurança e velocidade
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Engenharia de entrega segura para{" "}
              <span className="bg-gradient-to-r from-brand via-white to-brand-2 bg-clip-text text-transparent">
                produto e plataforma
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg">
              A ITFACT - IT SOLUTIONS acelera o ciclo de desenvolvimento com
              automação, políticas de segurança e observabilidade — tudo pronto
              para produção, do código ao runtime.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contato"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Falar com especialista <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#servicos"
                className="inline-flex h-12 items-center justify-center rounded-full border border-card-border bg-card px-6 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-white/10"
              >
                Ver serviços
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Segurança contínua",
                  value: "Shift-left + runtime",
                  icon: ShieldCheck,
                },
                { title: "Automação", value: "CI/CD + GitOps", icon: GitBranch },
                { title: "Observabilidade", value: "SLOs + traces", icon: Radar },
              ].map(({ title, value, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-card-border bg-card p-4 backdrop-blur"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-brand" />
                    <p className="text-sm font-semibold">{title}</p>
                  </div>
                  <p className="mt-2 text-sm text-muted">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-3 backdrop-blur">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.35),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.25),transparent_50%)]" />
              <div className="relative grid gap-3 p-3 sm:p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Blueprint</p>
                  <span className="rounded-full border border-card-border bg-black/30 px-3 py-1 text-xs text-muted">
                    Plataforma de entrega
                  </span>
                </div>
                <div className="grid gap-3">
                  {[
                    {
                      icon: Lock,
                      title: "Policy-as-code",
                      desc: "Conformidade automatizada em pipeline e cluster.",
                    },
                    {
                      icon: Cloud,
                      title: "Infraestrutura como produto",
                      desc: "Templates e módulos para provisionar com governança.",
                    },
                    {
                      icon: Brain,
                      title: "IA aplicada",
                      desc: "Assistentes e automações para reduzir toil e risco.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex gap-3 rounded-2xl border border-card-border bg-black/25 p-4"
                    >
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                        <Icon className="h-5 w-5 text-brand-2" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {title}
                        </p>
                        <p className="mt-1 text-sm text-muted">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-card-border bg-black/25 p-4">
                  <div>
                    <p className="text-sm font-semibold">
                      Entrega com confiança
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Pipeline com segurança integrada e observabilidade.
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                    <ShieldCheck className="h-5 w-5 text-brand" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-brand/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-2/20 blur-3xl" />
          </div>
        </section>

        <Section
          id="servicos"
          eyebrow="Serviços"
          title="Do código ao runtime, com segurança por padrão"
          subtitle="Implementamos práticas e plataforma de DevSecOps e IA para elevar o nível de entrega com governança, automação e visibilidade."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "DevSecOps",
                desc: "Integração de segurança em todo o SDLC: SAST, SCA, secrets, DAST e supply chain.",
              },
              {
                icon: GitBranch,
                title: "CI/CD & GitOps",
                desc: "Pipelines consistentes, ambientes reprodutíveis, deploys auditáveis e rollback rápido.",
              },
              {
                icon: Lock,
                title: "Segurança em Cloud",
                desc: "Políticas, IAM, posture management e hardening para workloads e dados.",
              },
              {
                icon: Radar,
                title: "Observabilidade",
                desc: "Traces, métricas e logs com foco em SLOs, incident response e redução de MTTR.",
              },
              {
                icon: Cloud,
                title: "Plataforma & Kubernetes",
                desc: "Blueprint de clusters, network, secret management e padrões de deploy.",
              },
              {
                icon: Brain,
                title: "IA Aplicada",
                desc: "Automação inteligente para triagem, qualidade, detecção de risco e produtividade.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-3xl border border-card-border bg-card p-6 backdrop-blur transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className="h-6 w-6 text-brand" />
                  </div>
                  <p className="text-base font-semibold">{title}</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="plataforma"
          eyebrow="Soluções"
          title="Uma plataforma de entrega com governança"
          subtitle="Padrões prontos, automações e controles que reduzem risco e aumentam previsibilidade."
        >
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="rounded-3xl border border-card-border bg-card p-7 backdrop-blur lg:col-span-7">
              <p className="text-sm font-semibold text-white">
                Plataforma como produto
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Desenhamos e implantamos uma plataforma interna que padroniza
                pipelines, deploys e segurança, com catálogos e templates para
                time-to-value rápido.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Golden paths (templates)",
                  "Policy-as-code e compliance",
                  "Secrets e chaves gerenciadas",
                  "Artefatos assinados e SBOM",
                  "Provisionamento padronizado",
                  "Telemetria e alertas por SLO",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-card-border bg-black/25 px-4 py-3 text-sm text-muted"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 lg:col-span-5">
              {[
                {
                  title: "Governança sem atrito",
                  desc: "Controles automatizados e auditáveis, com boa DX.",
                },
                {
                  title: "Entrega resiliente",
                  desc: "Deploys seguros com observabilidade desde o início.",
                },
                {
                  title: "IA para acelerar",
                  desc: "Automação inteligente para reduzir toil e priorizar risco.",
                },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-card-border bg-card p-6 backdrop-blur"
                >
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="stack"
          eyebrow="Stack"
          title="Tecnologias que usamos no dia a dia"
          subtitle="Ferramentas e padrões modernos para construir plataformas de entrega confiáveis."
        >
          <div className="flex flex-wrap gap-3">
            {[
              "Kubernetes",
              "Terraform",
              "GitHub Actions",
              "GitLab CI",
              "Argo CD",
              "OpenTelemetry",
              "AWS",
              "Azure",
              "GCP",
              "Vault",
              "OPA / Gatekeeper",
              "Trivy",
              "Snyk",
              "Prometheus",
              "Grafana",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-card-border bg-card px-4 py-2 text-sm text-muted backdrop-blur"
              >
                {item}
              </span>
            ))}
          </div>
        </Section>

        <Section
          id="cases"
          eyebrow="Casos"
          title="Resultados que importam"
          subtitle="Exemplos de entregas típicas (personalizamos para sua realidade)."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Pipeline seguro em escala",
                desc: "Padronização de CI/CD com scans, SBOM e assinaturas para múltiplos times.",
                badge: "Supply chain",
              },
              {
                title: "Plataforma GitOps",
                desc: "Deploys auditáveis com GitOps, ambientes reprodutíveis e trilhas de release.",
                badge: "GitOps",
              },
              {
                title: "Observabilidade orientada a SLO",
                desc: "Telemetria e governança de alertas para reduzir MTTR e ruído operacional.",
                badge: "SRE",
              },
            ].map(({ title, desc, badge }) => (
              <div
                key={title}
                className="rounded-3xl border border-card-border bg-card p-7 backdrop-blur"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{title}</p>
                  <span className="rounded-full border border-card-border bg-black/30 px-3 py-1 text-xs text-muted">
                    {badge}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="contato"
          eyebrow="Contato"
          title="Vamos acelerar sua entrega com segurança"
          subtitle="Conte rapidamente seu contexto e retornamos com um plano inicial."
        >
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="rounded-3xl border border-card-border bg-card p-7 backdrop-blur lg:col-span-5">
              <p className="text-sm font-semibold">ITFACT - IT SOLUTIONS</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Se preferir, envie por email ou use o formulário. Integramos
                DevSecOps e IA de forma incremental, com quick wins e visão de
                plataforma.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  "Diagnóstico rápido (SDLC, riscos e gargalos)",
                  "Plano de execução por etapas (90 dias)",
                  "Blueprint de plataforma e governança",
                  "Métricas, SLOs e roadmap de observabilidade",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-card-border bg-black/25 px-4 py-3 text-sm text-muted"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <a
                className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-full border border-card-border bg-black/30 px-6 text-sm font-semibold text-foreground transition hover:bg-white/10"
                href="mailto:contatos@itfact.com?subject=Contato%20-%20ITFACT"
              >
                contatos@itfact.com
              </a>
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Parceiros"
          title="Tecnologia validada em campo"
          subtitle="Trabalhamos com parceiros líderes para entregar segurança e performance."
        >
          <div className="relative overflow-hidden py-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
            <div className="partners-marquee flex w-max items-center gap-12 px-2">
              {[...partners, ...partners].map(({ name, logo }, index) => (
                <div
                  key={`${name}-${index}`}
                  className="relative h-24 w-72 shrink-0"
                >
                  <Image
                    src={logo}
                    alt={name}
                    fill
                    sizes="288px"
                    className="object-contain opacity-95 transition hover:opacity-100"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
