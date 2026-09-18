import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function GraphMemory() {
  return (
    <div>
      <SectionIntro
        eyebrow="MEMORY"
        title="Graph Memory"
        description="Store entities and relationships in Neo4j and retrieve connected knowledge as context."
      />

      <div className="space-y-12">
        {/* 01 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            01 — What is Graph Memory?
          </h2>

          <p className="leading-7 text-white/65">
            Graph Memory provides long-term, relationship-aware storage using
            Neo4j. Instead of storing isolated pieces of information, Maya-Agent
            represents knowledge as entities connected by relationships.
          </p>
        </section>

        {/* 02 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            02 — Connect to Neo4j
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            Configure your Neo4j connection through environment variables.
          </p>

          <CodeBlock language="bash">
            {`NEO4J_URI=neo4j+s://your-instance.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your-password
NEO4J_DATABASE=neo4j`}
          </CodeBlock>

          <p className="mt-4 leading-7 text-white/65">
            The database name is optional and defaults to{" "}
            <code className="font-mono text-sm text-emerald-400">
              neo4j
            </code>
            .
          </p>
        </section>

        {/* 03 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            03 — Create Graph Memory
          </h2>

          <CodeBlock language="javascript">
            {`import {
  GraphClient,
  GraphMemory,
} from "maya-agent";

const graphClient = new GraphClient();

const graphMemory = new GraphMemory(
  graphClient
);`}
          </CodeBlock>

          <p className="mt-4 leading-7 text-white/65">
            Verify the connection before using the graph.
          </p>

          <CodeBlock language="javascript">
            {`const connected =
  await graphClient.verifyConnection();

console.log(connected);`}
          </CodeBlock>
        </section>

        {/* 04 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            04 — Store a fact
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            The simplest way to create connected knowledge is{" "}
            <code className="font-mono text-sm text-emerald-400">
              rememberFact()
            </code>
            .
          </p>

          <CodeBlock language="javascript">
            {`await graphMemory.rememberFact({
  subject: {
    id: "sumanx",
    type: "Person",
    properties: {
      name: "Suman",
    },
  },

  relation: "WORKS_ON",

  object: {
    id: "maya-agent",
    type: "Project",
    properties: {
      name: "Maya-Agent",
    },
  },
});`}
          </CodeBlock>
        </section>

        {/* 05 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            05 — Retrieve a node
          </h2>

          <CodeBlock language="javascript">
            {`const node =
  await graphMemory.getNode("sumanx");

console.log(node.properties);`}
          </CodeBlock>
        </section>

        {/* 06 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            06 — Explore the neighborhood
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            Retrieve relationships connected to an entity with{" "}
            <code className="font-mono text-sm text-emerald-400">
              getNeighborhood()
            </code>
            .
          </p>

          <CodeBlock language="javascript">
            {`const context =
  await graphMemory.getNeighborhood({
    nodeId: "sumanx",
    depth: 1,
  });

console.log(context);`}
          </CodeBlock>

          <p className="mt-4 leading-7 text-white/65">
            Neighborhood depth must be an integer between{" "}
            <code className="font-mono text-sm text-emerald-400">
              1
            </code>{" "}
            and{" "}
            <code className="font-mono text-sm text-emerald-400">
              3
            </code>
            .
          </p>
        </section>

        {/* 07 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            07 — Graph Retriever
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            Use{" "}
            <code className="font-mono text-sm text-emerald-400">
              GraphRetriever
            </code>{" "}
            to retrieve relationship context for one or more entity IDs.
          </p>

          <CodeBlock language="javascript">
            {`import { GraphRetriever } from "maya-agent";

const retriever = new GraphRetriever({
  graphMemory,
});

const results = await retriever.retrieve({
  entityIds: ["sumanx"],
});

console.log(results);`}
          </CodeBlock>
        </section>

        {/* 08 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            08 — Supported relationships
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              "WORKS_ON",
              "USES",
              "PREFERS",
              "KNOWS",
              "INTERESTED_IN",
              "MENTIONS",
              "RELATED_TO",
            ].map((relationship) => (
              <div
                key={relationship}
                className="rounded-xl border border-white/8 bg-white/[0.02] p-4"
              >
                <code className="font-mono text-sm text-emerald-400">
                  {relationship}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* 09 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            09 — Core API
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard title="addNode()">
              Create or update an entity in the graph.
            </FeatureCard>

            <FeatureCard title="addRelationship()">
              Connect two existing entities.
            </FeatureCard>

            <FeatureCard title="rememberFact()">
              Create both entities and connect them with a relationship.
            </FeatureCard>

            <FeatureCard title="getNode()">
              Retrieve a single entity by ID.
            </FeatureCard>

            <FeatureCard title="getContext()">
              Retrieve directly connected graph context.
            </FeatureCard>

            <FeatureCard title="getNeighborhood()">
              Retrieve relationships within a configured graph depth.
            </FeatureCard>
          </div>
        </section>

        {/* 10 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            10 — Close the connection
          </h2>

          <CodeBlock language="javascript">
            {`await graphClient.close();`}
          </CodeBlock>
        </section>
      </div>
    </div>
  );
}