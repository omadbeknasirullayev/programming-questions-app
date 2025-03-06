const { QuestionModel } = require("../../model");
const { BaseRepository } = require("../../shared/database");

class QuestionRepository extends BaseRepository {
  constructor() {
    super("questions");
  }

  /**
   * create question repository
   * @param {QuestionModel} body
   * @return {QuestionModel}
   */
  async create(body) {
    const query = `INSERT INTO questions(name, position, "languageId", "levelId", "categoryId") VALUES($1, $2, $3, $4, $5) RETURNING *;`;

    const data = await this.db.query(query, [
      body.name,
      body.position,
      body.languageId,
      body.levelId,
      body.categoryId,
    ]);
    return data;
  }

  /**
   * find by username question repository
   * @param {QuestionModel} body
   * @return {QuestionModel}
   */
  async findByOptions(body) {
    const query = `SELECT * FROM questions WHERE name = $1 AND "languageId" = $2 AND "levelId" = $3 AND "categoryId" = $4;`;
    const data = await this.db.query(query, [
      body.name,
      body.languageId,
      body.levelId,
      body.categoryId,
    ]);
    return data[0];
  }

  ///**
  //  * update question repository
  //  */
  // async update(id, body) {
  //   const keys = Object.keys(body);
  //   if (keys.length === 0) throw new Error("No fields to update");

  //   const setQuery = keys
  //     .map((key, index) => `${key} = $${index + 1}`)
  //     .join(", ");

  //   const query = `UPDATE questions SET ${setQuery} WHERE id = $${
  //     keys.length + 1
  //   } RETURNING *;`;

  //   const values = [...keys.map((key) => body[key]), id];
  //   const data = await this.db.query(query, values);
  //   return data[0];
  // }
}

module.exports = QuestionRepository;
