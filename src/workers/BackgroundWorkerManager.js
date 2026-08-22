export class BackgroundWorkerManager {
  constructor({
    workers = []
  } = {}) {
    this.workers = workers;
  }

  start() {
    for (const worker of this.workers) {
      if (
        typeof worker.start === "function"
      ) {
        worker.start();
      }
    }
  }
}