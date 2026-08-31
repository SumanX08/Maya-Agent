import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
} from "lucide-react";

const codeExamples = {
  "agent.js": `import { Agent } from 'maya-agent';

const agent = new Agent({
  name: 'Maya',
  instructions: 'You are a helpful AI assistant.',
  tools: [searchTool],
});

const result = await agent.run(
  'Plan my next project'
);`,

  "tools.js": `import { Tool } from 'maya-agent';

const searchTool = new Tool({
  name: 'search',
  description: 'Search for information',

  execute: async ({ query }) => {
    return await search(query);
  },
});`,

  "memory.js": `import { Session } from 'maya-agent';

const session = new Session({
  id: 'user-session-01',
});

await agent.run(
  'Remember my project idea',
  { session }
);`,
};

const Hero = () => {
  const [activeTab, setActiveTab] = useState("agent.js");
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(codeExamples[activeTab]);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="relative min-h-[calc(100vh-88px)] overflow-hidden bg-[#050a08]">
      {/* Background Grid */}
      <div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: `
      linear-gradient(rgba(34, 197, 94, 0.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34, 197, 94, 0.055) 1px, transparent 1px)
    `,
    backgroundSize: "52px 52px",
  }}
>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.06),transparent_65%)]" />
</div>
      {/* Main Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">

          {/* LEFT CONTENT */}
          <div className="max-w-xl">

            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.05] px-4 py-2 font-mono text-sm text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Open Source · JavaScript SDK
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-zinc-100 lg:text-6xl">
              Build AI Agents.
              <br />

              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Own the Runtime.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
              Maya-Agent is an open-source JavaScript SDK for building
              reliable AI agents with tools, memory, guardrails, handoffs,
              graph intelligence, and full observability.
            </p>

            {/* Quote */}
            <p className="mt-6 font-mono text-sm leading-6 tracking-wide text-emerald-200/40">
              “Build powerful AI agents without hiding the runtime.”
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">

              <a
                href="#features"
                className="group inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-[#06110b] transition hover:bg-emerald-300"
              >
                Get Started

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="https://github.com/SumanX08/Maya-Agent"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] px-5 py-3 font-semibold text-zinc-200 transition hover:border-emerald-400/40 hover:bg-emerald-500/[0.08]"
              >
                View on GitHub

                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

            </div>

            {/* Install Command */}
            <div className="mt-7 flex items-center gap-3 font-mono text-sm text-zinc-500">
              <span className="text-emerald-500">$</span>
              <span>npm install maya-agent</span>
            </div>

          </div>

          {/* RIGHT CODE PLAYGROUND */}
          <div className="relative">

            {/* Panel Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-emerald-500/[0.03] blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#08100d]/95 shadow-2xl">

              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-emerald-500/10 px-5 py-3">

                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                </div>

                <span className="font-mono text-xs text-zinc-600">
                  maya-agent
                </span>

              </div>

              {/* Tabs */}
              <div className="flex border-b border-emerald-500/10">

                {Object.keys(codeExamples).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 py-3 font-mono text-xs transition ${
                      activeTab === tab
                        ? "bg-emerald-500/[0.05] text-emerald-300"
                        : "text-zinc-600 hover:text-zinc-300"
                    }`}
                  >
                    {tab}

                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-emerald-400" />
                    )}
                  </button>
                ))}

              </div>

              {/* Code Area */}
              <div className="relative min-h-[280px] overflow-x-auto p-5">

                {/* Copy Button */}
                <button
                  onClick={copyCode}
                  className="absolute right-4 top-4 rounded-lg border border-emerald-500/10 bg-[#0b1511] p-2 text-zinc-500 transition hover:border-emerald-500/30 hover:text-emerald-300"
                  title="Copy code"
                >
                  {copied ? (
                    <Check size={15} className="text-emerald-400" />
                  ) : (
                    <Copy size={15} />
                  )}
                </button>

                <pre className="pr-10 font-mono text-xs leading-6 text-zinc-300">
                  <code>{codeExamples[activeTab]}</code>
                </pre>

              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between border-t border-emerald-500/10 px-5 py-3">

                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Runtime ready
                </div>

                <span className="font-mono text-xs text-zinc-600">
                  {activeTab}
                </span>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;