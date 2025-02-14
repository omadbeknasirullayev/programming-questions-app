const db = require("../../config/postgres-client");
const { AdminModel } = require("../../model");
const { ErrorHandler } = require("../../shared/helper/lib");

class AdminRepository {
  constructor(req, res) {
    this.req = req
    this.res = res;
    this.db = new db();
  }

  /**
   * create admin repository
   * @param {AdminModel} body
   * @return {AdminModel}
   */
  async create(body) {
    try {
      const query = `INSERT INTO admins(fullname, username, password, role) VALUES ($1, $2, $3, $4) RETURNING*;`;

      const data = await this.db.query(query, [
        body.fullname,
        body.username,
        body.password,
        body.role,
      ]);

      return data;
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }
}

module.exports = AdminRepository
