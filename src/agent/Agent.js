import { randomUUID } from "node:crypto";
import { AgentRunner } from "./AgentRunner.js";

export class Agent{
    constructor({
        name,
        instructions,
        model,
        tools=[],
        maxSteps=10
    }){
       if (!name) {
      throw new Error("Agent name is required");
    }

    if (!instructions) {
      throw new Error("Agent instructions are required");
    }

    if (!model) {
      throw new Error("Agent model is required");
    }
        this.name = name;
    this.instructions = instructions;
    this.model = model;
    this.tools = tools;
    this.maxSteps = maxSteps;

    this.runner = new AgentRunner(this);

    }
    async run(input){
        const runId=randomUUID()

        const response = await this.runner.run(input);


    return{
        runId,
      agent: this.name,
      output: response.output,
      usage: response.usage
    }

    }
}