const { SuccessResponse } = require("../../shared/helper/lib");
const { bodyParser } = require("../../shared/helper/utility");
const AdminService = require("./admin.service");

class AdminController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.response = new SuccessResponse(res);
    this.service = new AdminService(req, res);
  }

  /** create admin controller */
  async create() {
    const body = await bodyParser(this.req);
  }
}
