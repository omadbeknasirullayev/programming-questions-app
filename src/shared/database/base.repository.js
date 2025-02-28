const db = require("../../config/postgres-client");
const { ErrorHandler } = require("../helper/lib");

class BaseRepository {
  constructor(req, res, dbName) {
    this.req = req;
    this.res = res;
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
    // try {
    const query = `DELETE FROM ${this.dbName} where id = ${id};`;
    const data = await this.db.query(query);

    return data;
    // } catch (error) {
    //   await new ErrorHandler(this.res, error);
    // }
  }

  /** close db */
  async closeDb() {
    // try {
    await this.db.close();
    // } catch (error) {
    //   await new ErrorHandler(this.res, error);
    // }
  }
}

module.exports = BaseRepository;
