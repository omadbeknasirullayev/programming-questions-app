const { SuccessResponse, ValidationError } = require("../../shared/helper/lib");
const { LanguageValidation } = require("../../shared/validation");
const LanguageService = require("./language.service");
const { AuthGuard } = require("../../shared/guard");
const { bodyParser, getParam } = require("../../shared/helper/utility");

class LanguageController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.authGuard = new AuthGuard(req);
    this.response = new SuccessResponse(res).response;
    this.service = new LanguageService();
  }

  /** create language controller api */
  async create() {
    try {
      await this.authGuard.check("admin");
      const data = await bodyParser(this.req);
      const validate = new LanguageValidation(data);
      await validate.createValidate();

      if (validate.isValid()) {
        throw new ValidationError(422, validate.getErrors());
      }

      const result = await this.service.create(data);
      await this.service.repository.closeDb();
      await this.response(201, result, "success");
    } catch (error) {
      await this.service.repository.closeDb();
      throw error;
    }
  }

  /** get all language controller api */
  async getAll() {
    try {
      const result = await this.service.getAll();
      await this.service.repository.closeDb();
      await this.response(200, result, "success");
    } catch (error) {
      await this.service.repository.closeDb();
      throw error;
    }
  }

  /** get one language controller api */
  async getOne() {
    try {
      const id = await getParam(this.req);
      const result = await this.service.getOne(id);

      await this.service.repository.closeDb();
      await this.response(200, result, "success");
    } catch (error) {
      await this.service.repository.closeDb();
      throw error;
    }
  }

  /** update language controller api */
  async update() {
    try {
      await this.authGuard.check("admin");
      const id = await getParam(this.req);
      const body = await bodyParser(this.req);

      const validate = new LanguageValidation(body);
      validate.updateValidation();

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

  /** remove language controller api */
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

module.exports = LanguageController;
