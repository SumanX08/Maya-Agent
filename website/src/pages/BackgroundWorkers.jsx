import SectionIntro from "../components/docs/SectionIntro";
import FeatureCard from "../components/docs/FeatureCard";

export default function BackgroundWorkers() {
  return (
    <>
      <SectionIntro
        label="BACKGROUND WORKERS"
        title="Background Workers"
        description="Process long-term graph memory asynchronously without blocking the main agent interaction."
      />

      <FeatureCard title="Memory Extraction Worker">
        Extracts useful entities and facts from conversations and agent
        interactions.
      </FeatureCard>

      <FeatureCard title="Relationship Builder Worker">
        Identifies and creates relationships between entities stored in
        graph memory.
      </FeatureCard>

      <FeatureCard title="Graph Maintenance Worker">
        Performs maintenance operations to keep graph memory useful and
        consistent over time.
      </FeatureCard>

      <h2 className="mt-10 text-2xl font-semibold">
        Why background processing?
      </h2>

      <p className="mt-4 leading-7 text-slate-400">
        Memory extraction and graph operations do not need to block the
        user's request. Running them independently keeps the main agent
        loop focused on producing a response.
      </p>
    </>
  );
}