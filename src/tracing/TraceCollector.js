export class TraceCollector {
  constructor({
    eventBus
  }) {
    this.eventBus = eventBus;
    this.traces = new Map();

    this.unsubscribe =
      this.eventBus.on(
        "trace",
        event => {
          const {
            runId
          } = event;

          if (!this.traces.has(runId)) {
            this.traces.set(
              runId,
              []
            );
          }

          this.traces
            .get(runId)
            .push(event);
        }
      );
  }

  getRun(runId) {
    return (
      this.traces.get(runId) || []
    );
  }

  clearRun(runId) {
    this.traces.delete(runId);
  }

  clear() {
    this.traces.clear();
  }

  destroy() {
    this.unsubscribe();
    this.clear();
  }
}