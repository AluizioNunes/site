import { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function Section({ id, eyebrow, title, subtitle, children }: Props) {
  return (
    <section id={id} className="py-14 sm:py-16">
      <div className="flex flex-col gap-3">
        <div className="inline-flex w-fit items-center rounded-full border border-card-border bg-card px-3 py-1 text-xs text-muted backdrop-blur">
          {eyebrow}
        </div>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <p className="max-w-2xl text-pretty text-sm leading-6 text-muted sm:text-base">
          {subtitle}
        </p>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

