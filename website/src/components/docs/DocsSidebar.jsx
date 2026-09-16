import {
  BookOpen,
  Boxes,
  Brain,
  Code2,
  Cpu,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";

const groups = [
  {
    title: "GETTING STARTED",
    icon: BookOpen,
    items: [
      "Introduction",
      "Installation",
      "Quick Start",
    ],
  },
  {
    title: "CORE",
    icon: Boxes,
    items: [
      "Agents",
      "Tools",
      "Guardrails",
      "Handoffs",
    ],
  },
  {
    title: "MEMORY",
    icon: Brain,
    items: [
      "Memory",
      "Graph Memory",
      "Background Workers",
    ],
  },
  {
    title: "RUNTIME",
    icon: Cpu,
    items: [
      "Providers",
      "Structured Output",
      "Streaming",
      "Tracing",
    ],
  },
  {
    title: "EXAMPLES",
    icon: Code2,
    items: [
      "Examples",
    ],
  },
];

export default function DocsSidebar({
  sections,
  activeSection,
  onSelect,
  mobileOpen,
}) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => onSelect(activeSection)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-18 z-50 h-[calc(100vh-72px)]
          w-70 border-r border-white/[0.07]
          bg-[#060a09]/95 backdrop-blur-xl
          transition-transform duration-300
          lg:sticky lg:top-18 lg:z-20 lg:block
          lg:h-[calc(100vh-72px)]
          lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="h-full overflow-y-auto px-5 py-8">
          {/* Header */}
          <div className="mb-8 px-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-emerald-500/20 bg-emerald-500/5">
                <Zap
                  size={13}
                  className="text-emerald-400"
                />
              </div>

              <span className="text-md font-semibold text-slate-300">
                Documentation
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              Build reliable AI agents with
              Maya-Agent.
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-7">
            {groups.map((group) => {
              const Icon = group.icon;

              return (
                <div key={group.title}>
                  {/* Group title */}
                  <div className="mb-2 flex items-center gap-2 px-2">
                    <Icon
                      size={12}
                      className="text-slate-700"
                    />

                    <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-slate-600">
                      {group.title}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-0.5">
                    {group.items.map((section) => {
                      const active =
                        activeSection === section;

                      return (
                        <button
                          key={section}
                          onClick={() =>
                            onSelect(section)
                          }
                          className={`
                            group relative flex w-full
                            items-center rounded-lg
                            px-3 py-2.5 text-left
                            text-sm transition-all duration-200
                            ${
                              active
                                ? "bg-emerald-500/8 text-emerald-400"
                                : "text-slate-500 hover:bg-white/2.5 hover:text-slate-300"
                            }
                          `}
                        >
                          {/* Active indicator */}
                          {active && (
                            <span className="absolute left-0 h-5 w-0.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                          )}

                          <span
                            className={`
                              transition-transform duration-200
                              ${
                                active
                                  ? ""
                                  : "group-hover:translate-x-0.5"
                              }
                            `}
                          >
                            {section}
                          </span>

                          {/* Active dot */}
                          {active && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Bottom SDK card */}
          <div className="mt-10 rounded-xl border border-white/6 bg-white/1.5 p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={14}
                className="text-emerald-500/70"
              />

              <span className="text-xs font-medium text-slate-400">
                Open Source SDK
              </span>
            </div>

            <p className="mt-2 text-[11px] leading-5 text-slate-600">
              JavaScript-first infrastructure
              for building AI agents.
            </p>

            <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-slate-700">
              <Code2 size={11} />
              <span>maya-agent</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}