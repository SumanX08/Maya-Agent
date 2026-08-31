import { BookOpen, ArrowUpRight, Box } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-emerald-500/10 bg-[#060a09] px-6 py-28">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(34,197,94,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="text-5xl font-bold leading-tight text-white md:text-6xl">
          Start building with{" "}
          <span className="text-emerald-400">Maya-Agent.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Everything you need to build, deploy, and observe production AI
          agents — in a single open-source JavaScript SDK.
        </p>

        <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-xl border border-emerald-500/20 bg-[#09100e] px-5 py-4 font-mono text-sm">
          <span className="text-emerald-400">$</span>
          <code className="text-slate-300">
            npm install maya-agent
          </code>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
         

          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-[#0a1210] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-emerald-400/40"
          >
            View on GitHub
            <ArrowUpRight size={16} />
          </a>

          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 px-6 py-3 text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            <Box size={16} />
            Install from npm
          </a>
        </div>
      </div>
    </section>
  );
}
