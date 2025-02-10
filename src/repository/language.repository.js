const db = require("../config/postgres-client");
const { LanguageModel } = require("../model");
const { CustomError, ErrorHandler } = require("../infratructure/lib");

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
  async getOne(param) {
    try {
      const query = `SELECT * FROM languages WHERE id = ${param};`;
      const data = await this.db.query(query);
      if (!data[0]) {
        throw new CustomError(404, "Not found language");
      }

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
   * @param {number} param
   */
  async remove(param) {
    const query = `DELETE languages where id = ${param};`;
    const data = await this.db.query(query);

    return data;
  }
}

module.exports = LanguageRepository;
