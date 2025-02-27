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
}

module.exports = AdminRepository;
