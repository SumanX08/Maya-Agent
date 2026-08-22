import { randomUUID } from "node:crypto";
import { AgentRunner } from "./AgentRunner.js";
import { EventBus } from "../events/EventBus.js";
import { Session } from "../memory/Session.js";
import { InMemorySessionStore } from "../memory/SessionStore.js";

export class Agent {
  constructor({
  name,
  instructions,
  model,
  tools = [],
  maxSteps = 10,
  eventBus = new EventBus(),
  sessionStore = new InMemorySessionStore(),
  backgroundWorkers = []
}) {
    if (!name) {
      throw new Error("Agent name is required");
    }

    if (!instructions) {
      throw new Error("Agent instructions are required");
    }

    if (!model) {
      throw new Error("Agent model is required");
    }

    this.name = name;
    this.instructions = instructions;
    this.model = model;
    this.tools = tools;
    this.maxSteps = maxSteps;

    // Important: actually store these dependencies
    this.eventBus = eventBus;
    this.sessionStore = sessionStore;

    this.backgroundWorkers = backgroundWorkers;

for (const worker of this.backgroundWorkers) {
  worker.start();
}

    this.runner = new AgentRunner(this);
  }

  createSession(metadata = {}) {
    const session = new Session({
      metadata
    });

    this.sessionStore.create(session);

    return session;
  }

  async run(input, { session = null } = {}) {
    const runId = randomUUID();

    if (!session) {
      session = this.createSession();
    }

    this.eventBus.emit("run.started", {
      runId,
      agent: this.name,
      sessionId: session.id,
      input
    });

    try {
      const response = await this.runner.run(
        input,
        runId,
        session
      );

      const result = {
        runId,
        agent: this.name,
        sessionId: session.id,
        output: response.output,
        usage: response.usage,
        messages: session.getMessages()

      };

      this.eventBus.emit("run.completed", result);

      await this.sessionStore.save(session);

      return result;

    } catch (error) {
      this.eventBus.emit("run.failed", {
        runId,
        agent: this.name,
        sessionId: session.id,
        error
      });

      throw error;
    }
  }
}