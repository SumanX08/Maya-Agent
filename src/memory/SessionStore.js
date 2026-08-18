export class InMemorySessionStore {
  constructor() {
    this.sessions = new Map();
  }

  async create(session) {
    this.sessions.set(session.id, session);

    return session;
  }

  async get(sessionId) {
    return this.sessions.get(sessionId) || null;
  }

  async save(session) {
    this.sessions.set(session.id, session);

    return session;
  }

  async delete(sessionId) {
    this.sessions.delete(sessionId);
  }

  async has(sessionId) {
    return this.sessions.has(sessionId);
  }
}