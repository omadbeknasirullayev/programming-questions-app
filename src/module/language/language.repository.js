const db = require("../../config/postgres-client");
const { LanguageModel } = require("../../model");
const { BaseRepository } = require("../../shared/database");
const { ErrorHandler } = require("../../shared/helper/lib");

/** Language Repository */
class LanguageRepository extends BaseRepository {
  constructor(req, res) {
    super(req, res, "languages");
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
   * update Language Repository (faqat berilgan keylarni yangilaydi)
   * @param {number} id
   * @param {Object} body
   * @return {LanguageModel}
   */
  async update(id, body) {
    try {
      const keys = Object.keys(body);
      if (keys.length === 0) throw new Error("No fields to update");

      const setQuery = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

      const query = `UPDATE languages SET ${setQuery} WHERE id = $${
        keys.length + 1
      } RETURNING *;`;

      const values = [...keys.map((key) => body[key]), id];

      const data = await this.db.query(query, values);
      return data[0];
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }
}

module.exports = LanguageRepository;
