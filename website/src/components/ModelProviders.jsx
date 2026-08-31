import { Sparkles, BrainCircuit } from "lucide-react";

export default function ModelProviders() {
  return (
    <section className="border-t border-emerald-500/10 bg-[#060a09] px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 font-mono text-xs font-semibold tracking-[0.25em] text-emerald-400">
          MODEL PROVIDERS
        </p>

        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Bring your preferred model.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-slate-400">
          Provider abstraction keeps Maya-Agent extensible without coupling your
          application to a single model provider.
        </p>

        <div className="mx-auto mt-12 grid max-w-2xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/15 bg-[#0b1210] p-7 text-left transition hover:border-emerald-400/40">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10">
                <Sparkles className="text-slate-200" size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-white">OpenAI</h3>
                <p className="mt-1 font-mono text-xs text-slate-500">
                  GPT models
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/15 bg-[#0b1210] p-7 text-left transition hover:border-emerald-400/40">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20">
                <BrainCircuit className="text-emerald-400" size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-white">Google Gemini</h3>
                <p className="mt-1 font-mono text-xs text-slate-500">
                  Gemini models
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 font-mono text-xs text-slate-600">
          Extend the ModelProvider interface to support additional providers.
        </p>
      </div>
    </section>
  );
}