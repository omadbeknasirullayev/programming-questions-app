const db = require("../../config/postgres-client");

class BaseRepository {
  constructor(dbName) {
    this.dbName = dbName;
    this.db = new db();
  }

  /** find all repository */
  async findAll() {
    const query = `SELECT * FROM ${this.dbName};`;
    const data = await this.db.query(query);
    return data;
  }

  /**
   * find one repository
   * @param {number} id
   */
  async findOne(id) {
    const query = `SELECT * FROM ${this.dbName} WHERE id = ${id};`;
    const data = await this.db.query(query);
    return data[0];
  }

  /**
   * remove Repository
   * @param {number} id
   */
  async remove(id) {
    const query = `DELETE FROM ${this.dbName} where id = ${id};`;
    const data = await this.db.query(query);

    return data;
  }

  async update(id, body) {
    const keys = Object.keys(body);
    if (keys.length === 0) throw new Error("No fields to update");

    const setQuery = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const query = `UPDATE ${this.dbName} SET ${setQuery} WHERE id = $${
      keys.length + 1
    } RETURNING *;`;

    const values = [...keys.map((key) => body[key]), id];
    const data = await this.db.query(query, values);
    return data[0];
  }

  /** close db */
  async closeDb() {
    await this.db.close();
  }
}

module.exports = BaseRepository;
