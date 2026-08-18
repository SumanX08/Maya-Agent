export class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event).push(listener);

    // Allows:
    // const unsubscribe = eventBus.on(...)
    return () => {
      const listeners = this.listeners.get(event);

      if (!listeners) return;

      this.listeners.set(
        event,
        listeners.filter(item => item !== listener)
      );
    };
  }

  emit(event, data) {
    const listeners = this.listeners.get(event) || [];

    for (const listener of listeners) {
      try {
        listener(data);
      } catch (error) {
        console.error(
          `Event listener failed for "${event}":`,
          error
        );
      }
    }
  }
}