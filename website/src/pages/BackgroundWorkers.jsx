import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function BackgroundWorkers() {
  return (
    <div>
      <SectionIntro
        eyebrow="MEMORY"
        title="Background Workers"
        description="Run graph-memory processing asynchronously through an event-driven worker pipeline."
      />

      <div className="space-y-12">
        {/* 01 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            01 — Event-driven processing
          </h2>

          <p className="leading-7 text-white/65">
            Maya-Agent provides independent background workers that react to
            runtime events. They can process completed agent runs without
            adding that work directly to the main agent execution flow.
          </p>
        </section>

        {/* 02 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            02 — The worker pipeline
          </h2>

          <div className="space-y-3">
            {[
              ["01", "run.completed", "Memory extraction"],
              [
                "02",
                "memory.extraction.completed",
                "Relationship building",
              ],
              [
                "03",
                "relationship.building.completed",
                "Graph maintenance",
              ],
            ].map(([number, event, worker]) => (
              <div
                key={event}
                className="rounded-xl border border-white/8 bg-white/[0.02] p-5"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-sm text-emerald-400">
                    {number}
                  </span>

                  <code className="font-mono text-sm text-white/80">
                    {event}
                  </code>
                </div>

                <p className="text-white/55">{worker}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 03 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            03 — Memory Extraction Worker
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            The memory extraction worker listens for{" "}
            <code className="font-mono text-sm text-emerald-400">
              run.completed
            </code>
            , extracts entities and relationships from the completed
            conversation, and stores them in Graph Memory.
          </p>

          <CodeBlock language="javascript">
            {`const extractionWorker =
  new MemoryExtractionWorker({
    extractionModel,
    graphMemory,
    eventBus,
  });`}
          </CodeBlock>

          <p className="mt-4 leading-7 text-white/65">
            Starting the worker subscribes it to the event bus.
          </p>

          <CodeBlock language="javascript">
            {`extractionWorker.start();`}
          </CodeBlock>
        </section>

        {/* 04 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            04 — Relationship Builder Worker
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            The relationship builder listens for completed memory extraction.
            It analyzes graph context and creates new relationships when the
            candidate confidence meets the configured threshold.
          </p>

          <CodeBlock language="javascript">
            {`const relationshipWorker =
  new RelationshipBuilderWorker({
    relationshipModel,
    graphMemory,
    eventBus,
    confidenceThreshold: 0.75,
  });`}
          </CodeBlock>
        </section>

        {/* 05 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            05 — Graph Maintenance Worker
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            The graph maintenance worker listens for completed relationship
            building and maintains relationship confidence in the graph.
          </p>

          <CodeBlock language="javascript">
            {`const maintenanceWorker =
  new GraphMaintenanceWorker({
    graphMemory,
    eventBus,
    minimumConfidence: 0.35,
    confidenceDecay: 0.05,
  });`}
          </CodeBlock>

          <p className="mt-4 leading-7 text-white/65">
            Explicitly extracted memories are protected from maintenance.
            Relationships created by the relationship builder can have their
            confidence reduced or be removed when they fall below the
            configured threshold.
          </p>
        </section>

        {/* 06 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            06 — Start multiple workers
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            Use{" "}
            <code className="font-mono text-sm text-emerald-400">
              BackgroundWorkerManager
            </code>{" "}
            to start multiple workers together.
          </p>

          <CodeBlock language="javascript">
            {`const workerManager =
  new BackgroundWorkerManager({
    workers: [
      extractionWorker,
      relationshipWorker,
      maintenanceWorker,
    ],
  });

workerManager.start();`}
          </CodeBlock>
        </section>

        {/* 07 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            07 — Worker lifecycle events
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard title="memory.extraction.started">
              Emitted when memory extraction begins.
            </FeatureCard>

            <FeatureCard title="memory.extraction.completed">
              Emitted after entities and relationships have been extracted.
            </FeatureCard>

            <FeatureCard title="relationship.building.started">
              Emitted when relationship analysis begins.
            </FeatureCard>

            <FeatureCard title="relationship.building.completed">
              Emitted after relationship candidates have been processed.
            </FeatureCard>

            <FeatureCard title="graph.maintenance.started">
              Emitted when graph maintenance begins.
            </FeatureCard>

            <FeatureCard title="graph.maintenance.completed">
              Emitted after graph relationships have been evaluated.
            </FeatureCard>
          </div>
        </section>

        {/* 08 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            08 — Complete setup
          </h2>

          <CodeBlock language="javascript">
            {`const extractionWorker =
  new MemoryExtractionWorker({
    extractionModel,
    graphMemory,
    eventBus,
  });

const relationshipWorker =
  new RelationshipBuilderWorker({
    relationshipModel,
    graphMemory,
    eventBus,
  });

const maintenanceWorker =
  new GraphMaintenanceWorker({
    graphMemory,
    eventBus,
  });

const workerManager =
  new BackgroundWorkerManager({
    workers: [
      extractionWorker,
      relationshipWorker,
      maintenanceWorker,
    ],
  });

workerManager.start();`}
          </CodeBlock>
        </section>
      </div>
    </div>
  );
}