const { LanguageValidation } = require("../validation");
const { LanguageRepository } = require("../repository");
const {
  bodyParser,
  SuccessResponse,
  ValidationError,
  CustomError,
  ErrorHandler,
} = require("../infratructure/lib");
const { getParam } = require("../infratructure/utility");

class LanguageService {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.response = new SuccessResponse(res);
    this.repository = new LanguageRepository(req, res);
  }

  /** create language Service */
  async create() {
    try {
      const data = await bodyParser(this.req);

      const validate = new LanguageValidation(data);
      await validate.createValidate();

      if (validate.isValid()) {
        throw new ValidationError(422, validate.getErrors());
      }

      const result = await this.repository.create(data);

      this.res.writeHead(201, { "Content-Type": "application/json" });
      this.res.end(
        JSON.stringify({ statusCode: 201, data: result, message: "success" }),
      );
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }

  /** get one language Service*/
  async getOne() {
    try {
      const param = await getParam(this.req, this.res);

      const data = await this.repository.getOne(param);

      await this.response.response(200, data, "success");
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }

  /** get all language Service */
  async getAll() {
    try {
      const data = await this.repository.getAll();
      await this.response(200, data, "success");
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }

  /** delete language Service */
  async remove() {
    const param = await getParam(this.req, this.res);
    const checkData = await this.repository.getOne(param);
    if (!checkData) {
      throw new CustomError(404, "Language not found");
    }

    const data = await this.repository.remove(param);

    await this.response(200, data, "success");
  }
}

module.exports = LanguageService;
