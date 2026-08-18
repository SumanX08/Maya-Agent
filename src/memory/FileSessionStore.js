import fs from "fs/promises";
import path from "path";
import { Session } from "./Session.js";

export class FileSessionStore {
  constructor({
    directory = "./.sumanx/sessions"
  } = {}) {
    this.directory = directory;
  }

  async ensureDirectory() {
    await fs.mkdir(this.directory, {
      recursive: true
    });
  }

  getPath(sessionId) {
    return path.join(
      this.directory,
      `${sessionId}.json`
    );
  }

  async create(session) {
    await this.ensureDirectory();

    await this.save(session);

    return session;
  }

  async get(sessionId) {
    try {
      const data = await fs.readFile(
        this.getPath(sessionId),
        "utf8"
      );

      const parsed = JSON.parse(data);

      return Session.fromJSON(parsed);

    } catch (error) {
      if (error.code === "ENOENT") {
        return null;
      }

      throw error;
    }
  }

  async save(session) {
    await this.ensureDirectory();

    await fs.writeFile(
      this.getPath(session.id),
      JSON.stringify(
        session.toJSON(),
        null,
        2
      )
    );

    return session;
  }

  async delete(sessionId) {
    try {
      await fs.unlink(
        this.getPath(sessionId)
      );
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  async has(sessionId) {
    try {
      await fs.access(
        this.getPath(sessionId)
      );

      return true;

    } catch {
      return false;
    }
  }
}