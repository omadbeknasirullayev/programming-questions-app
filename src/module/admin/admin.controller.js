const { AuthGuard } = require("../../shared/guard");
const {
  SuccessResponse,
  CustomError,
  ErrorHandler,
  ValidationError,
} = require("../../shared/helper/lib");
const { bodyParser } = require("../../shared/helper/utility");
const { AdminValidation } = require("../../shared/validation");
const AdminService = require("./admin.service");

class AdminController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.authGuard = new AuthGuard(req, res);
    this.response = new SuccessResponse(res).response;
    this.service = new AdminService(req, res);
  }

  /** create admin controller */
  async create() {
    try {
      await this.authGuard.check("admin")
      const body = await bodyParser(this.req);
      const validate = new AdminValidation(body);
      await validate.createValidation();
      if (validate.isValid()) {
        throw new ValidationError(422, validate.getErrors());
      }

      const result = await this.service.create(body);

      await this.response(201, result, "success");
    } catch (error) {
      await new ErrorHandler(this.res, error);
    }
  }
}

module.exports = AdminController;
