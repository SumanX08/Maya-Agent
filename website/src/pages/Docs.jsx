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
import Agents from './AgentS'


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

  const selectSection = (section) => {
    const entry = Object.entries(sectionNames).find(
      ([, name]) => name === section
    );

    if (!entry) return;

    const [path] = entry;

    navigate(path ? `/docs/${path}` : "/docs");

    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#060a09] text-white">
      <DocsHeader
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="mx-auto flex max-w-7xl">
        <DocsSidebar
          sections={sections}
          activeSection={activeSection}
          onSelect={selectSection}
          mobileOpen={mobileOpen}
        />

        <main className="min-w-0 flex-1 px-6 py-12 md:px-12 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <Page />
          </div>
        </main>
      </div>
    </div>
  );
}