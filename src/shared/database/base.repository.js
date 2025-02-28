const db = require("../../config/postgres-client");

class BaseRepository {
  constructor(dbName) {
    this.dbName = dbName;
    this.db = new db();
  }

  /** find all admin repository */
  async findAll() {
    const query = `SELECT * FROM ${this.dbName};`;
    const data = await this.db.query(query);
    return data;
  }

  /**
   * find one amdin repository
   * @param {number} id
   */
  async findOne(id) {
    const query = `SELECT * FROM ${this.dbName} WHERE id = ${id};`;
    const data = await this.db.query(query);
    return data[0];
  }

  /**
   * remove Language Repository
   * @param {number} id
   */
  async remove(id) {
    const query = `DELETE FROM ${this.dbName} where id = ${id};`;
    const data = await this.db.query(query);

    return data;
  }

  /** close db */
  async closeDb() {
    await this.db.close();
  }
}

module.exports = BaseRepository;
