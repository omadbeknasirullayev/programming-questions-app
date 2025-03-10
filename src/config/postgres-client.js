const { Pool } = require("pg");
const config = require("./config");

class PostgreSQLClient {
  constructor() {
    this.pool = new Pool({
      host: config.db_host,
      port: config.db_port,
      user: config.db_user,
      password: config.db_password,
      database: config.db_name,
    });
  }

  async query(queryText, params = []) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(queryText, params);
      return result.rows;
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    } finally {
      client.release();
    }
  }

  close() {
    this.pool.end();
  }
}

module.exports = PostgreSQLClient;
