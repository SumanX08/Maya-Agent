export const docsSections = [
  "Introduction",
  "Installation",
  "Quick Start",
  "Agents",
  "Tools",
  "Guardrails",
  "Handoffs",
  "Memory",
  "Graph Memory",
  "Background Workers",
  "Providers",
  "Structured Output",
  "Streaming",
  "Tracing",
  "Examples",
];

export const docs = {
  Introduction: {
    title: "Maya-Agent",
    description:
      "An open-source JavaScript SDK for building reliable AI agents with tools, memory, guardrails, handoffs, graph intelligence, and observability.",
  },

  Installation: {
    title: "Installation",
    description:
      "Install Maya-Agent directly from npm and configure your model provider.",
  },

  "Quick Start": {
    title: "Quick Start",
    description:
      "Create your first Maya-Agent agent in a few lines.",
  },

  Agents: {
    title: "Agents",
    description:
      "Create and configure AI agents with instructions, models, tools, memory, and runtime controls.",
  },

  Tools: {
    title: "Tools",
    description:
      "Give agents capabilities through custom asynchronous tools with structured inputs and results.",
  },

  Guardrails: {
    title: "Guardrails",
    description:
      "Validate and control agent inputs, outputs, and tool execution.",
  },

  Handoffs: {
    title: "Handoffs",
    description:
      "Delegate tasks between specialized agents while preserving context and preventing loops.",
  },

  Memory: {
    title: "Memory",
    description:
      "Persist conversations and retrieve context across agent sessions.",
  },

  "Graph Memory": {
    title: "Graph Memory",
    description:
      "Store and retrieve long-term relationships and knowledge using graph memory.",
  },

  "Background Workers": {
    title: "Background Workers",
    description:
      "Run memory extraction, relationship building, and graph maintenance asynchronously.",
  },

  Providers: {
    title: "Providers",
    description:
      "Connect Maya-Agent to supported LLM providers through a provider abstraction.",
  },

  "Structured Output": {
    title: "Structured Output",
    description:
      "Generate validated structured responses using schemas and output validation.",
  },

  Streaming: {
    title: "Streaming",
    description:
      "Stream agent execution and model events as they happen.",
  },

  Tracing: {
    title: "Tracing",
    description:
      "Inspect agent execution through structured events and traces.",
  },

  Examples: {
    title: "Examples",
    description:
      "Explore practical examples of building agents with Maya-Agent.",
  },
};

export const sectionToSlug = (section) =>
  section
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");

export const slugToSection = (slug) => {
  const section = docsSections.find(
    (item) => sectionToSlug(item) === slug
  );

  return section || "Introduction";
};