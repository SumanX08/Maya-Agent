export default function FeatureCard({
  title,
  children,
}) {
  return (
    <div className="mt-5 rounded-xl border border-emerald-500/15 bg-[#0a100e] p-5">
      <h3 className="font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-slate-400">
        {children}
      </p>
    </div>
  );
}