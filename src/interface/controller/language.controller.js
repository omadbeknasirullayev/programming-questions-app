const { LanguageCreateService } = require("../../application/use-cases/language");
const { SuccessResponse } = require("../infratructure/helper/lib");
const { bodyParser, getParam } = require("../infratructure/helper/utility");
const { LanguageValidation } = require("../infratructure/validation");
const { LanguageService } = require("../service");

class LanguageController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.createLanguage = new LanguageCreateService(req, res)
    this.response = new SuccessResponse(res);
    this.service = new LanguageService(req, res);
  }

  /** create language controller api */
  async create() {
    const data = await bodyParser(this.req);
    const validate = new LanguageValidation(data);
    await validate.createValidate();

    if (validate.isValid()) {
      throw new ValidationError(422, validate.getErrors());
    }

    const result = await this.createLanguage.create(data);
    await this.response(201, result, "success");
  }

  /** get all language controller api */
  async getAll() {
    const result = await this.service.getAll();
    await this.response(200, result, "success");
  }

  /** get one language controller api */
  async getOne() {
    const id = getParam(this.req, this.res);

    const result = await this.service.getOne(id);
    await this.response(200, result, "success");
  }

  /** remove language controller api */
  async remove() {
    const id = getParam(this.req, this.res);

    const result = await this.service.remove(id);
    await this.response(200, result, "success");
  }
}

module.exports = LanguageController;
