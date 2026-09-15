import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Memory() {
  return (
    <>
      <SectionIntro
        label="MEMORY"
        title="Memory"
        description="Persist conversation state across agent runs using sessions and session stores."
      />

      <h2 className="mt-10 text-2xl font-semibold">
        Sessions
      </h2>

      <p className="mt-4 leading-7 text-slate-400">
        A session represents the conversation state associated with an
        agent interaction.
      </p>

      <CodeBlock>
{`session.addMessage({
  role: "user",
  content: "Remember that I use JavaScript.",
});

const messages =
  session.getMessages();`}
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Session storage
      </h2>

      <FeatureCard title="SessionStore">
        Defines the persistence abstraction for storing and retrieving
        sessions.
      </FeatureCard>

      <FeatureCard title="FileSessionStore">
        Provides file-based persistence suitable for local development
        and lightweight applications.
      </FeatureCard>

      <p className="mt-8 leading-7 text-slate-400">
        Keeping the storage layer separate from the runtime allows
        applications to replace the default persistence implementation
        when needed.
      </p>
    </>
  );
}