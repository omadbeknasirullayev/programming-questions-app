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
    try {
      await this.authGuard.check("admin");
      const body = await bodyParser(this.req);
      const validate = new AdminValidation(body);
      await validate.createValidation();
      if (validate.isValid()) {
        throw new ValidationError(422, validate.getErrors());
      }

      const result = await this.service.create(body);
      await this.service.repository.closeDb();
      await this.response(201, result, "success");
    } catch (error) {
      await this.service.repository.closeDb();
      throw error;
    }
  }

  /** find all admin controller */
  async findAll() {
    try {
      await this.authGuard.check("admin");
      const result = await this.service.findAll();
      await this.service.repository.closeDb();
      await this.response(200, result, "success");
    } catch (error) {
      await this.service.repository.closeDb();
      throw error;
    }
  }

  /** find one admin controller */
  async findOne() {
    try {
      await this.authGuard.check("admin");
      const id = await getParam(this.req);
      const result = await this.service.findOne(id);
      await this.service.repository.closeDb();
      await this.response(200, result, "success");
    } catch (error) {
      await this.service.repository.closeDb();
      throw error;
    }
  }

  /** update admin controller */
  async update() {
    try {
      await this.authGuard.check("admin");
      const id = await getParam(this.req);
      const body = await bodyParser(this.req);
      const validate = new AdminValidation(body);
      await validate.updateValidation();
      if (validate.isValid()) {
        throw new ValidationError(422, validate.getErrors());
      }
      const result = await this.service.update(id, body);
      await this.service.repository.closeDb();
      await this.response(200, result, "success");
    } catch (error) {
      await this.service.repository.closeDb();
      throw error;
    }
  }

  /** remove admin controller */
  async remove() {
    try {
      const id = getParam(this.req);
      const result = await this.service.remove(id);
      await this.service.repository.closeDb();
      await this.response(200, result, "success");
    } catch (error) {
      await this.service.repository.closeDb();
      throw error;
    }
  }
}

module.exports = AdminController;
