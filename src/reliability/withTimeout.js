export function withTimeout(
  promise,
  timeoutMs,
  message = "Operation timed out"
) {
  if (
    !timeoutMs ||
    timeoutMs <= 0
  ) {
    return promise;
  }

  return Promise.race([
    promise,

    new Promise(
      (_, reject) => {
        const timer =
          setTimeout(() => {
            const error =
              new Error(message);

            error.code =
              "TIMEOUT";

            reject(error);
          }, timeoutMs);

        promise.finally(() => {
          clearTimeout(timer);
        });
      }
    )
  ]);
}