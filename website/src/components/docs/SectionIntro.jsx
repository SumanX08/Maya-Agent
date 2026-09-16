export default function SectionIntro({
  label,
  title,
  description,
}) {
  return (
    <header className="mb-12">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-emerald-500/60" />

        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400">
          {label}
        </p>
      </div>

      <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
        {title}
      </h1>

      <p className="mt-5 max-w-2xl text-[17px] leading-8 text-slate-400">
        {description}
      </p>
    </header>
  );
}