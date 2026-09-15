import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function GraphMemory() {
  return (
    <>
      <SectionIntro
        label="GRAPH MEMORY"
        title="Graph Memory"
        description="Store long-term entities and relationships using graph-based memory."
      />

      <p className="mt-6 leading-7 text-slate-400">
        Graph memory extends normal conversation memory by representing
        knowledge as entities and relationships. Maya-Agent uses Neo4j
        for persistent graph storage.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        GraphMemory
      </h2>

      <FeatureCard title="Entities">
        Represent people, projects, technologies, preferences, and
        other pieces of long-term knowledge.
      </FeatureCard>

      <FeatureCard title="Relationships">
        Connect entities through meaningful relationships that can be
        retrieved later.
      </FeatureCard>

      <FeatureCard title="Retrieval">
        Relevant graph information can be retrieved and incorporated
        into an agent's context.
      </FeatureCard>

      <h2 className="mt-10 text-2xl font-semibold">
        Example graph
      </h2>

      <CodeBlock>
{`User
 ├── PREFERS ──> JavaScript
 └── WORKS_ON ──> Maya-Agent

Maya-Agent
 └── USES ──> Neo4j`}
      </CodeBlock>
    </>
  );
}