const { LanguageModel } = require("../../model");
const { BaseRepository } = require("../../shared/database");

/** Language Repository */
class LanguageRepository extends BaseRepository {
  constructor() {
    super("languages");
  }

  /**
   * create language Repository
   * @param {LanguageModel} body
   * @return {LanguageModel}
   */
  async create(body) {
    const query = `INSERT INTO languages(name, position) VALUES($1, $2) RETURNING *;`;
    const db = await this.db.query(query, [body.name, body.position]);
    return db;
  }

  /**
   * update Language Repository (faqat berilgan keylarni yangilaydi)
   * @param {number} id
   * @param {Object} body
   * @return {LanguageModel}
   */
  async update(id, body) {
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
  }
}

module.exports = LanguageRepository;
