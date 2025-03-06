const { CategoryModel } = require("../../model");
const { BaseRepository } = require("../../shared/database");

class CategoryRepository extends BaseRepository {
  constructor() {
    super("categories");
  }

  /**
   * create admin repository
   * @param {CategoryModel} body
   * @return {CategoryModel}
   */
  async create(body) {
    const query = `INSERT INTO categories(name, position, "languageId", "levelId") VALUES($1, $2, $3, $4) RETURNING *;`;

    const data = await this.db.query(query, [
      body.name,
      body.position,
      body.languageId,
      body.levelId,
    ]);
    return data;
  }

  /**
   * find by username admin repository
   * @param {CategoryModel} body
   * @return {CategoryModel}
   */
  async findByNameAndLanguageIdAndLevelId(body) {
    const query = `SELECT * FROM categories WHERE name = $1 AND "languageId" = $2 AND "levelId" = $3;`;
    const data = await this.db.query(query, [
      body.name,
      body.languageId,
      body.levelId,
    ]);
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

    const query = `UPDATE categories SET ${setQuery} WHERE id = $${
      keys.length + 1
    } RETURNING *;`;

    const values = [...keys.map((key) => body[key]), id];
    const data = await this.db.query(query, values);
    return data[0];
  }
}

module.exports = CategoryRepository;
