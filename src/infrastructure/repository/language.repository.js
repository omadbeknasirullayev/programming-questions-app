const db = require("../database/postgres-client");
const { LanguageModel } = require("../model");
const { CustomError, ErrorHandler } = require("../infratructure/helper/lib");

/** Language Repository */
class LanguageRepository {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.db = new db();
  }

  /**
   * create language Repository
   * @param {LanguageModel} body
   * @return {LanguageModel}
   */
  async create(body) {
    try {
      const query = `INSERT INTO languages(name, position) VALUES($1, $2) RETURNING *;`;
      const db = await this.db.query(query, [body.name, body.position]);
      return db;
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }

  /**
   * get one language Repository
   * @param {number} param
   * @return {LanguageModel}
   */
  async getOne(id) {
    try {
      const query = `SELECT * FROM languages WHERE id = ${id};`;
      const data = await this.db.query(query);
      return data[0];
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }

  /** get one language Repository
   * @return {LanguageModel[]}
   */
  async getAll() {
    try {
      const query = `SELECT * FROM languages order by position ASC;`;
      const data = await this.db.query(query);
      return data;
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }

  /**
   * remove Language Repository
   * @param {number} id
   */
  async remove(id) {
    const query = `DELETE FROM languages where id = ${id};`;
    const data = await this.db.query(query);

    return data;
  }
}

module.exports = LanguageRepository;
