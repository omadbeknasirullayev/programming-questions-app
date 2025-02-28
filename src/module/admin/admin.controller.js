const { AuthGuard } = require("../../shared/guard");
const { SuccessResponse, ValidationError } = require("../../shared/helper/lib");
const { bodyParser, getParam } = require("../../shared/helper/utility");
const { AdminValidation } = require("../../shared/validation");
const AdminService = require("./admin.service");

class AdminController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.authGuard = new AuthGuard(req, res);
    this.response = new SuccessResponse(res).response;
    this.service = new AdminService();
  }

  /** create admin controller */
  async create() {
    await this.authGuard.check("admin");
    const body = await bodyParser(this.req);
    const validate = new AdminValidation(body);
    await validate.createValidation();
    if (validate.isValid()) {
      throw new ValidationError(422, validate.getErrors());
    }

    const result = await this.service.create(body);

    await this.response(201, result, "success");
  }

  /** find all admin controller */
  async findAll() {
    await this.authGuard.check("admin");
    const result = await this.service.findAll();
    await this.response(200, result, "success");
  }

  /** find one admin controller */
  async findOne() {
    await this.authGuard.check("admin");
    const id = await getParam(this.req);
    const result = await this.service.findOne(id);
    await this.response(200, result, "success");
  }

  /** update admin controller */
  async update() {
    await this.authGuard.check("admin");
    const id = await getParam(this.req);
    const body = await bodyParser(this.req);
    const validate = new AdminValidation(body);
    await validate.updateValidation();
    if (validate.isValid()) {
      throw new ValidationError(422, validate.getErrors());
    }
    const result = await this.service.update(id, body);
    await this.response(200, result, "success");
  }

  /** remove admin controller */
  async remove() {
    const id = getParam(this.req);
    const result = await this.service.remove(id);
    await this.response(200, result, "success");
  }
}

module.exports = AdminController;
