import { randomUUID } from "node:crypto";

export class Session {
  constructor({
    id = randomUUID(),
    metadata = {},
    messages = []
  } = {}) {
    this.id = id;
    this.metadata = metadata;
    this.messages = messages;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  addMessage(message) {
    this.messages.push(message);
    this.updatedAt = new Date();
  }

  getMessages() {
    return [...this.messages];
  }

  clear() {
    this.messages = [];
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      metadata: this.metadata,
      messages: this.messages,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }

  static fromJSON(data) {
    const session = new Session({
      id: data.id,
      metadata: data.metadata,
      messages: data.messages
    });

    session.createdAt = new Date(data.createdAt);
    session.updatedAt = new Date(data.updatedAt);

    return session;
  }
}