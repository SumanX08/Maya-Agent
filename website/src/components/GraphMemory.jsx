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
  <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#080e0c] shadow-[0_0_60px_rgba(16,185,129,0.04)]">
    
    {/* Graph header */}
    <div className="flex items-center justify-between px-5 pt-5">
      <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400/70">
        <CircleDot size={13} />
        <span>neo4j://localhost:7687</span>
      </div>

      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
    </div>

    {/* Graph */}
    <div className="px-4 pb-5 pt-4">
      <svg
        viewBox="0 0 520 270"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connections */}

        {/* User → Project */}
        <line
          x1="118"
          y1="150"
          x2="232"
          y2="105"
          stroke="rgba(16,185,129,0.35)"
          strokeWidth="1"
        />

        {/* Project → Technology */}
        <line
          x1="292"
          y1="90"
          x2="358"
          y2="90"
          stroke="rgba(16,185,129,0.35)"
          strokeWidth="1"
        />

        {/* User → JavaScript */}
        <line
          x1="118"
          y1="160"
          x2="358"
          y2="205"
          stroke="rgba(16,185,129,0.35)"
          strokeWidth="1"
        />

        {/* Connection dots */}
        <circle
          cx="232"
          cy="105"
          r="2.5"
          fill="#10b981"
        />

        <circle
          cx="358"
          cy="90"
          r="2.5"
          fill="#10b981"
        />

        <circle
          cx="358"
          cy="205"
          r="2.5"
          fill="#10b981"
        />

        {/* Relationship labels */}

        <text
          x="150"
          y="122"
          fill="rgba(100,116,139,0.8)"
          fontSize="8"
          fontFamily="monospace"
          letterSpacing="0.5"
        >
          WORKS_ON
        </text>

        <text
          x="315"
          y="82"
          fill="rgba(100,116,139,0.8)"
          fontSize="8"
          fontFamily="monospace"
          letterSpacing="0.5"
        >
          USES
        </text>

        <text
          x="235"
          y="195"
          fill="rgba(100,116,139,0.8)"
          fontSize="8"
          fontFamily="monospace"
          letterSpacing="0.5"
        >
          PREFERS
        </text>

        {/* User node */}
        <circle
          cx="85"
          cy="155"
          r="31"
          fill="#08110e"
          stroke="rgba(16,185,129,0.38)"
          strokeWidth="1"
        />

        <text
          x="85"
          y="158"
          textAnchor="middle"
          fill="#a7f3d0"
          fontSize="10"
          fontWeight="600"
          fontFamily="monospace"
        >
          User
        </text>

        {/* Project node */}
        <circle
          cx="262"
          cy="90"
          r="31"
          fill="#08110e"
          stroke="rgba(16,185,129,0.38)"
          strokeWidth="1"
        />

        <text
          x="262"
          y="93"
          textAnchor="middle"
          fill="#a7f3d0"
          fontSize="10"
          fontWeight="600"
          fontFamily="monospace"
        >
          Project
        </text>

        {/* Technology node */}
        <circle
          cx="396"
          cy="90"
          r="35"
          fill="#08110e"
          stroke="rgba(16,185,129,0.38)"
          strokeWidth="1"
        />

        <text
          x="396"
          y="93"
          textAnchor="middle"
          fill="#a7f3d0"
          fontSize="10"
          fontWeight="600"
          fontFamily="monospace"
        >
          Technology
        </text>

        {/* JavaScript node */}
        <circle
          cx="400"
          cy="205"
          r="38"
          fill="#08110e"
          stroke="rgba(16,185,129,0.38)"
          strokeWidth="1"
        />

        <text
          x="400"
          y="208"
          textAnchor="middle"
          fill="#a7f3d0"
          fontSize="10"
          fontWeight="600"
          fontFamily="monospace"
        >
          JavaScript
        </text>
      </svg>
    </div>
  </div>

  <p className="mt-5 text-center font-mono text-[11px] tracking-[0.08em] text-slate-600">
    Live graph — entities and relationships
  </p>
</div>
      </div>
    </section>
  );
}