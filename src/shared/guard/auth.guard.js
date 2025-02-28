const AdminRepository = require("../../module/admin/admin.repository");
const { JWTToken, CustomError, ErrorHandler } = require("../helper/lib");

class AuthGuard {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.adminRepository = new AdminRepository(req, res);
    this.jwt = new JWTToken(req, res);
  }

  /** check authorization  */
  async check(...roles) {
    try {
      console.log(roles);
      const token = this.req?.headers["authorization"]?.split(" ")[1];

      const checkToken = await this.jwt.verifyToken(token);

      if (!checkToken) {
        throw new CustomError(401, "Unauthorized!");
      }

      const checkRole = roles.includes(checkToken.role);

      if (!checkRole) {
        throw new CustomError(403, "Not permission!");
      }

      return true;
    } catch (error) {
      await new ErrorHandler(this.res, error);
    }
  }
}

module.exports = AuthGuard;
