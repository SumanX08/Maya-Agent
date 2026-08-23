export class OutputValidationError extends Error {
  constructor({
    message,
    issues = [],
    rawOutput = null
  }) {
    super(message);

    this.name = "OutputValidationError";
    this.issues = issues;
    this.rawOutput = rawOutput;
  }
}