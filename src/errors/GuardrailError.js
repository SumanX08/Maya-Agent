export class GuardrailError extends Error {
  constructor({
    guardrail,
    message,
    stage
  }) {
    super(message);

    this.name = "GuardrailError";
    this.guardrail = guardrail;
    this.stage = stage;
  }
}