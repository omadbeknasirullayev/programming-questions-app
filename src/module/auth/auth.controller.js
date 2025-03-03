const { ValidationError, SuccessResponse } = require("../../shared/helper/lib");
const { bodyParser } = require("../../shared/helper/utility");
const { AuthValidation } = require("../../shared/validation");
const AuthService = require("./auth.service");

class AuthController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.response = new SuccessResponse(res).response;
    this.service = new AuthService();
  }

  /** admin login auth controller  */
  async adminLogin() {
    try {
      const body = await bodyParser(this.req);
      const validate = new AuthValidation(body);
      await validate.adminLoginValidation();

      if (validate.isValid()) {
        throw new ValidationError(422, validate.getErrors());
      }
      const result = await this.service.adminLogin(body);

      await this.service.adminRepository.closeDb();
      await this.response(200, result, "success");
    } catch (error) {
      await this.service.adminRepository.closeDb();
      throw error;
    }
  }
}

module.exports = AuthController;
