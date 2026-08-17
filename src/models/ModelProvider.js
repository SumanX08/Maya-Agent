export class ModelProvider {
  async generate() {
    throw new Error("generate() must be implemented by a model provider");
  }
}