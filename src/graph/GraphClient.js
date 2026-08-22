import neo4j from "neo4j-driver";

export class GraphClient {
  constructor({
    uri = process.env.NEO4J_URI,
    username = process.env.NEO4J_USERNAME,
    password = process.env.NEO4J_PASSWORD,
    database = process.env.NEO4J_DATABASE || "neo4j"
  } = {}) {
    if (!uri) {
      throw new Error("NEO4J_URI is not configured");
    }

    if (!username) {
      throw new Error("NEO4J_USERNAME is not configured");
    }

    if (!password) {
      throw new Error("NEO4J_PASSWORD is not configured");
    }

    this.database = database;

    this.driver = neo4j.driver(
      uri,
      neo4j.auth.basic(username, password)
    );
  }

  async run(query, params = {}) {
    const session = this.driver.session({
      database: this.database
    });

    try {
      const result = await session.run(
        query,
        params
      );

      return result;
    } finally {
      await session.close();
    }
  }

  async verifyConnection() {
    await this.run("RETURN 1 AS result");

    return true;
  }

  async close() {
    await this.driver.close();
  }
}