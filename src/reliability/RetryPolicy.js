export class RetryPolicy {
  constructor({
    maxAttempts = 3,
    delayMs = 500,
    backoff = 2
  } = {}) {
    this.maxAttempts = maxAttempts;
    this.delayMs = delayMs;
    this.backoff = backoff;
  }

  async execute(fn, {
    onRetry = null
  } = {}) {
    let lastError;

    for (
      let attempt = 1;
      attempt <= this.maxAttempts;
      attempt++
    ) {
      try {
        return await fn(attempt);
      } catch (error) {
        lastError = error;

        if (
          attempt >= this.maxAttempts
        ) {
          break;
        }

        const delay =
          this.delayMs *
          Math.pow(
            this.backoff,
            attempt - 1
          );

        if (onRetry) {
          await onRetry({
            attempt,
            nextAttempt: attempt + 1,
            delay,
            error
          });
        }

        await new Promise(
          resolve =>
            setTimeout(resolve, delay)
        );
      }
    }

    throw lastError;
  }
}