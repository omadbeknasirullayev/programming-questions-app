const AdminRepository = require("../../module/admin/admin.repository");
const { JWTToken, CustomError } = require("../helper/lib");

class AuthGuard {
  constructor(req) {
    this.req = req;
    this.adminRepository = new AdminRepository();
    this.jwt = new JWTToken();
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
      throw error;
    }
  }
}

module.exports = AuthGuard;
