export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(139,92,246,0.18),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(6,182,212,0.12),transparent_50%),radial-gradient(circle_at_60%_90%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand/25 blur-3xl" />
      <div className="absolute -right-44 top-20 h-96 w-96 rounded-full bg-brand-2/20 blur-3xl" />
      <div className="absolute left-1/2 top-[28rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
    </div>
  );
}

