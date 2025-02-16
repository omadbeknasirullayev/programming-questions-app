const {
  CustomError,
  JWTToken,
  ErrorHandler,
} = require("../../shared/helper/lib");
const { compaire } = require("../../shared/helper/utility");
const AdminRepository = require("../admin/admin.repository");

class AuthService {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.adminRepository = new AdminRepository(req, res);
    this.jwt = new JWTToken(req, res);
  }

  /**
   * admin login auth service
   * @param {{username: string, password: string}} body
   */
  async adminLogin(body) {
    try {
      const admin = await this.adminRepository.findByUsername(body.username);

      if (!admin) {
        throw new CustomError(401, "Incorrect username or password!");
      }

      const check = await compaire(admin.password, body.password);
      if (!check) {
        throw new CustomError(401, "Incorrect username or password!");
      }

      const token = await this.jwt.generateToken(admin);
      await this.adminRepository.closeDb();
      return { ...admin, token };
    } catch (error) {
      await this.adminRepository.closeDb();
      await new ErrorHandler(this.res, error);
    }
  }
}

module.exports = AuthService;
