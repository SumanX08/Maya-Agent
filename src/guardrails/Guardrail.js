export class Guardrail {
  constructor({
    name,
    validate
  }) {
    if (!name) {
      throw new Error(
        "Guardrail name is required"
      );
    }

    if (typeof validate !== "function") {
      throw new Error(
        "Guardrail validate function is required"
      );
    }

    this.name = name;
    this.validate = validate;
  }

  async run(context) {
    const result =
      await this.validate(context);

    if (typeof result === "boolean") {
      return {
        passed: result,
        message: result
          ? undefined
          : "Guardrail failed"
      };
    }

    return {
      passed: Boolean(result?.passed),
      message: result?.message
    };
  }
}