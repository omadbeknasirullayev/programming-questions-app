const { AdminModel } = require("../../model");
const { BaseRepository } = require("../../shared/database");
const { ErrorHandler } = require("../../shared/helper/lib");

class AdminRepository extends BaseRepository {
  constructor(req, res) {
    super(req, res, "admins");
  }

  /**
   * create admin repository
   * @param {AdminModel} body
   * @return {AdminModel}
   */
  async create(body) {
    try {
      const query = `INSERT INTO admins(fullname, username, password) VALUES($1, $2, $3) RETURNING *;`;

      const data = await this.db.query(query, [
        body.fullname,
        body.username,
        body.password,
      ]);
      return data;
    } catch (error) {
      await this.closeDb();
      await new ErrorHandler(this.res, error);
    }
  }

  /**
   * find by username admin repository
   * @param {string} username
   * @return {AdminModel}
   */
  async findByUsername(username) {
    try {
      const query = `SELECT * FROM admins WHERE username = '${username}';`;
      const data = await this.db.query(query);
      return data[0];
    } catch (error) {
      await new ErrorHandler(this.res, error);
    }
  }

  /**
   * update admin repository
   */
  async update(id, body) {
    try {
      const keys = Object.keys(body);
      if (keys.length === 0) throw new Error("No fields to update");

      const setQuery = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

      const query = `UPDATE admins SET ${setQuery} WHERE id = $${
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

module.exports = AdminRepository;
