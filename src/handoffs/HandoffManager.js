export class HandoffManager {
  constructor({
    maxHandoffs = 3,
    eventBus
  } = {}) {
    this.maxHandoffs = maxHandoffs;
    this.eventBus = eventBus;
  }

  canHandoff(context) {
    const count =
      context.handoffCount || 0;

    return count < this.maxHandoffs;
  }

  async execute({
    fromAgent,
    toAgent,
    input,
    session,
    runId,
    context = {}
  }) {
    const handoffCount =
      (context.handoffCount || 0) + 1;

    if (
      handoffCount >
      this.maxHandoffs
    ) {
      throw new Error(
        `Maximum handoff limit (${this.maxHandoffs}) exceeded`
      );
    }

    this.eventBus?.emit(
      "handoff.started",
      {
        runId,
        from: fromAgent.name,
        to: toAgent.name,
        handoffCount
      }
    );

    try {
      const result =
        await toAgent.run(input, {
          session
        });

      this.eventBus?.emit(
        "handoff.completed",
        {
          runId,
          from: fromAgent.name,
          to: toAgent.name,
          handoffCount,
          result
        }
      );

      return result;

    } catch (error) {
      this.eventBus?.emit(
        "handoff.failed",
        {
          runId,
          from: fromAgent.name,
          to: toAgent.name,
          handoffCount,
          error
        }
      );

      throw error;
    }
  }
}