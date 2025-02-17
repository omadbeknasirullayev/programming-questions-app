const { SuccessResponse, ValidationError } = require("../../shared/helper/lib");
const { LanguageValidation } = require("../../shared/validation");
const LanguageService = require("./language.service");
const { AuthGuard } = require("../../shared/guard");
const { bodyParser, getParam } = require("../../shared/helper/utility");

class LanguageController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.authGuard = new AuthGuard(req, res);
    this.response = new SuccessResponse(res).response;
    this.service = new LanguageService(req, res);
  }

  /** create language controller api */
  async create() {
    await this.authGuard.check("admin");
    const data = await bodyParser(this.req);
    const validate = new LanguageValidation(data);
    await validate.createValidate();

    if (validate.isValid()) {
      throw new ValidationError(422, validate.getErrors());
    }

    const result = await this.service.create(data);
    await this.response(201, result, "success");
  }

  /** get all language controller api */
  async getAll() {
    const result = await this.service.getAll();
    await this.response(200, result, "success");
  }

  /** get one language controller api */
  async getOne() {
    const id = await getParam(this.req, this.res);

    const result = await this.service.getOne(id);
    await this.response(200, result, "success");
  }

  /** update language controller api */
  async update() {
    await this.authGuard.check("admin");
    const id = await getParam(this.req, this.res);
    const body = await bodyParser(this.req);

    const validate = new LanguageValidation(body);
    validate.updateValidation();

    if (validate.isValid()) {
      throw new ValidationError(422, validate.getErrors());
    }

    const result = await this.service.update(id, body);
    await this.response(200, result, "success");
  }

  /** remove language controller api */
  async remove() {
    await this.authGuard.check("admin");
    const id = getParam(this.req, this.res);

    const result = await this.service.remove(id);
    await this.response(200, result, "success");
  }
}

module.exports = LanguageController;
