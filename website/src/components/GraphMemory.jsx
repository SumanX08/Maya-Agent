import { CircleDot } from "lucide-react";

export default function GraphMemory() {
  const memoryLayers = [
    {
      title: "Current Run State",
      description: "In-memory context for the active execution",
    },
    {
      title: "Session Memory",
      description: "Conversation history across turns",
    },
    {
      title: "Persistent Graph Memory",
      description: "Long-term relationships stored in Neo4j",
    },
  ];

  return (
    <section className="border-t border-emerald-500/10 bg-[#080d0c] px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 font-mono text-xs font-semibold tracking-[0.25em] text-emerald-400">
            GRAPH INTELLIGENCE
          </p>

          <h2 className="max-w-md text-4xl font-bold leading-tight text-white md:text-5xl">
            Memory that understands relationships.
          </h2>

          <p className="mt-6 max-w-lg leading-7 text-slate-400">
            Maya-Agent maintains distinct memory layers so agents remember not
            just facts, but the connections between them.
          </p>

          <div className="mt-8 space-y-3">
            {memoryLayers.map((layer) => (
              <div
                key={layer.title}
                className="rounded-xl border border-emerald-500/15 bg-[#0c1311] p-5"
              >
                <div className="flex gap-4">
                  <div className="mt-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {layer.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-4 font-mono text-xs tracking-widest text-slate-500">
              BACKGROUND PROCESSES
            </p>

            <div className="space-y-3 font-mono text-sm">
              {[
                "01   Memory Extraction",
                "02   Relationship Builder",
                "03   Graph Maintenance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between text-slate-500"
                >
                  <span>{item}</span>

                  <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-emerald-500/20 bg-[#0a1210] p-6 shadow-[0_0_60px_rgba(16,185,129,0.04)]">
            <div className="mb-10 flex items-center gap-2 font-mono text-xs text-emerald-400/70">
              <CircleDot size={14} />
              neo4j://localhost:7687
            </div>

            <div className="relative mx-auto h-[300px] max-w-md">
              <div className="absolute left-4 top-28 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-[#0d1714] text-xs font-semibold text-emerald-200">
                User
              </div>

              <div className="absolute left-[150px] top-6 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-[#0d1714] text-xs font-semibold text-emerald-200">
                Project
              </div>

              <div className="absolute right-4 top-6 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-[#0d1714] text-xs font-semibold text-emerald-200">
                Tech
              </div>

              <div className="absolute right-4 bottom-10 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-[#0d1714] text-xs font-semibold text-emerald-200">
                JavaScript
              </div>

              <div className="absolute left-[72px] top-[120px] h-px w-[100px] rotate-[-16deg] bg-emerald-400/30" />

              <div className="absolute left-[205px] top-[40px] h-px w-[100px] bg-emerald-400/30" />

              <div className="absolute left-[72px] top-[145px] h-px w-[210px] rotate-[6deg] bg-emerald-400/30" />

              <span className="absolute left-[80px] top-[92px] font-mono text-[8px] text-slate-600">
                WORKS_ON
              </span>

              <span className="absolute left-[240px] top-[22px] font-mono text-[8px] text-slate-600">
                USES
              </span>

              <span className="absolute left-[190px] top-[165px] font-mono text-[8px] text-slate-600">
                PREFERS
              </span>
            </div>
          </div>

          <p className="mt-5 text-center font-mono text-xs text-slate-600">
            Live graph — entities and relationships
          </p>
        </div>
      </div>
    </section>
  );
}