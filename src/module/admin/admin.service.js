const { AdminModel } = require("../../model");
const { ErrorHandler, CustomError } = require("../../shared/helper/lib");
const { hashed } = require("../../shared/helper/utility");
const AdminRepository = require("./admin.repository");

class AdminService {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.repository = new AdminRepository(req, res);
  }

  /**
   * create admin service
   * @param {AdminModel} body
   * @return {AdminModel}
   */
  async create(body) {
    try {
      const check = await this.repository.findByUsername(body.username);
      console.log("check");
      if (check) {
        throw new CustomError(409, "This username already exists!");
      }
      body.password = await hashed(body.password);
      const data = await this.repository.create(body);
      await this.repository.closeDb();
      return data;
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }
}

module.exports = AdminService;
