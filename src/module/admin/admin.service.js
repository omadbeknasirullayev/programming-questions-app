const { AdminModel } = require("../../model");
const { ErrorHandler } = require("../../shared/helper/lib");
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
      const data = await this.repository.create(body);
      return data;
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }
}


module.exports = AdminService
