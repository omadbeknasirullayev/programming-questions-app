const { AuthGuard } = require("../../shared/guard");
const { SuccessResponse, ValidationError } = require("../../shared/helper/lib");
const { bodyParser, getParam } = require("../../shared/helper/utility");
const { CategoryValidation } = require("../../shared/validation");
const CategoryService = require("./category.service");

class CategoryController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.authGuard = new AuthGuard(req, res);
    this.response = new SuccessResponse(res).response;
    this.service = new CategoryService();
  }

  /** create category controller */
  async create() {
    try {
      await this.authGuard.check("admin");
      const body = await bodyParser(this.req);
      const validate = new CategoryValidation(body);
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

  /** find all category controller */
  async findAll() {
    try {
      const result = await this.service.findAll();
      await this.service.repository.closeDb();
      await this.response(200, result, "success");
    } catch (error) {
      await this.service.repository.closeDb();
      throw error;
    }
  }

  /** find one category controller */
  async findOne() {
    try {
      const id = await getParam(this.req);
      const result = await this.service.findOne(id);
      await this.service.repository.closeDb();
      await this.response(200, result, "success");
    } catch (error) {
      await this.service.repository.closeDb();
      throw error;
    }
  }

  /** update category controller */
  async update() {
    try {
      await this.authGuard.check("admin");

      const id = await getParam(this.req);
      const body = await bodyParser(this.req);

      const validate = new CategoryValidation(body);
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

  /** remove category controller */
  async remove() {
    try {
      await this.authGuard.check("admin");
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

module.exports = CategoryController;
