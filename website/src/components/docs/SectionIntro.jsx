export default function SectionIntro({
  label,
  title,
  description,
}) {
  return (
    <>
      <p className="mb-4 font-mono text-xs tracking-[0.2em] text-emerald-400">
        {label}
      </p>

      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h1>

      <p className="mt-5 text-lg leading-8 text-slate-400">
        {description}
      </p>
    </>
  );
}