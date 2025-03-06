const { AdminModel, LevelModel } = require("../../model");
const { BaseRepository } = require("../../shared/database");

class LevelRepository extends BaseRepository {
  constructor() {
    super("levels");
  }

  /**
   * create admin repository
   * @param {LevelModel} body
   * @return {LevelModel}
   */
  async create(body) {
    const query = `INSERT INTO levels(name, position, "languageId") VALUES($1, $2, $3) RETURNING *;`;

    const data = await this.db.query(query, [
      body.name,
      body.position,
      body.languageId,
    ]);
    return data;
  }

  /**
   * find by username admin repository
   * @param {LevelModel} body
   * @return {LevelModel}
   */
  async findByNameAndLanguageId(body) {
    const query = `SELECT * FROM levels WHERE name = $1 AND "languageId" = $2;`;
    const data = await this.db.query(query, [body.name, body.languageId]);
    return data[0];
  }

  /**
   * update admin repository
   */
  async update(id, body) {
    const keys = Object.keys(body);
    if (keys.length === 0) throw new Error("No fields to update");

    const setQuery = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const query = `UPDATE levels SET ${setQuery} WHERE id = $${
      keys.length + 1
    } RETURNING *;`;

    const values = [...keys.map((key) => body[key]), id];
    const data = await this.db.query(query, values);
    return data[0];
  }
}

module.exports = LevelRepository;
