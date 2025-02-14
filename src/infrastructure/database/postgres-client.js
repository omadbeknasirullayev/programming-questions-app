const { Pool } = require('pg');
const config = require('../../config/config');

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
      console.error('Database query error:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  async migrateTables() {
    const language = `
    CREATE TABLE IF NOT EXISTS languages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      position INTEGER NOT NULL
    );
    `

    try {
      await this.query(language)
      console.log(`ready table`);
    } catch (error) {
      console.error(error)
    }
  }

  close() {
    this.pool.end();
  }
}

module.exports = PostgreSQLClient;
