const db = require("../../config/postgres-client");
const { LanguageModel } = require("../../model");
const { CustomError, ErrorHandler } = require("../../shared/helper/lib");

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
   * update Language Repository (faqat berilgan keylarni yangilaydi)
   * @param {number} id
   * @param {Object} body
   * @return {LanguageModel}
   */
  async update(id, body) {
    try {
      const keys = Object.keys(body);
      if (keys.length === 0) throw new Error("No fields to update");

      // Dinamik SET qismi: ["name = $1", "position = $2"]
      const setQuery = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

      // Query stringini hosil qilish
      const query = `UPDATE languages SET ${setQuery} WHERE id = $${
        keys.length + 1
      } RETURNING *;`;

      // Queryga qo‘yiladigan qiymatlar massivi
      const values = [...keys.map((key) => body[key]), id];

      const data = await this.db.query(query, values);
      return data[0];
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
