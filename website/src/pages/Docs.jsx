import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import DocsHeader from "../components/docs/DocsHeader";
import DocsSidebar from "../components/docs/DocsSidebar";

import Introduction from "./Introduction";
import Installation from "./Installation";
import QuickStart from "./QuickStart";
import Tools from "./Tools";
import Guardrails from "./Guardrails";
import Handoffs from "./Handoffs";
import Memory from "./Memory";
import GraphMemory from "./GraphMemory";
import BackgroundWorkers from "./BackgroundWorkers";
import Providers from "./Providers";
import StructuredOutput from "./StructuredOutput";
import Streaming from "./Streaming";
import Tracing from "./Tracing";
import Examples from "./Examples";
import Agents from './Agents'


const pages = {
  "": Introduction,
  installation: Installation,
  "quick-start": QuickStart,
  agents: Agents,
  tools: Tools,
  guardrails: Guardrails,
  handoffs: Handoffs,
  memory: Memory,
  "graph-memory": GraphMemory,
  "background-workers": BackgroundWorkers,
  providers: Providers,
  "structured-output": StructuredOutput,
  streaming: Streaming,
  tracing: Tracing,
  examples: Examples,
};

const sectionNames = {
  "": "Introduction",
  installation: "Installation",
  "quick-start": "Quick Start",
  agents: "Agents",
  tools: "Tools",
  guardrails: "Guardrails",
  handoffs: "Handoffs",
  memory: "Memory",
  "graph-memory": "Graph Memory",
  "background-workers": "Background Workers",
  providers: "Providers",
  "structured-output": "Structured Output",
  streaming: "Streaming",
  tracing: "Tracing",
  examples: "Examples",
};

const sections = Object.values(sectionNames);

export default function Docs() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const slug = location.pathname
    .replace(/^\/docs\/?/, "")
    .replace(/\/$/, "");

  const Page = pages[slug] || Introduction;

  const activeSection = sectionNames[slug] || "Introduction";

  const currentIndex = sections.indexOf(activeSection);

  const previousSection =
    currentIndex > 0 ? sections[currentIndex - 1] : null;

  const nextSection =
    currentIndex < sections.length - 1
      ? sections[currentIndex + 1]
      : null;

  const getSlug = (section) => {
    const entry = Object.entries(sectionNames).find(
      ([, name]) => name === section
    );

    return entry ? entry[0] : "";
  };

  const selectSection = (section) => {
    const path = getSlug(section);

    navigate(path ? `/docs/${path}` : "/docs");

    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen docs-shell bg-[#050807] text-white">
      <DocsHeader
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="mx-auto flex max-w-375">
        <DocsSidebar
          sections={sections}
          activeSection={activeSection}
          onSelect={selectSection}
          mobileOpen={mobileOpen}
        />

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-5xl  py-14 lg:py-12">
            
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
              <span>Maya-Agent</span>
              <span>/</span>
              <span className="text-slate-400">
                {activeSection}
              </span>
            </div>

            <Page />

            {/* Previous / Next */}
            <div className="mt-20 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
              {previousSection ? (
                <button
                  onClick={() => selectSection(previousSection)}
                  className="group rounded-xl border border-white/10 bg-white/2 p-5 text-left transition hover:border-emerald-500/30 hover:bg-emerald-500/3"
                >
                  <p className="text-xs text-slate-600">
                    Previous
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-300 transition group-hover:text-emerald-400">
                    ← {previousSection}
                  </p>
                </button>
              ) : (
                <div />
              )}

              {nextSection && (
                <button
                  onClick={() => selectSection(nextSection)}
                  className="group rounded-xl border border-white/10 bg-white/2 p-5 text-right transition hover:border-emerald-500/30 hover:bg-emerald-500/3"
                >
                  <p className="text-xs text-slate-600">
                    Next
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-300 transition group-hover:text-emerald-400">
                    {nextSection} →
                  </p>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
