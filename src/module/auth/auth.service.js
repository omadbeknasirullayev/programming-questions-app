const { CustomError, JWTToken } = require("../../shared/helper/lib");
const { compaire } = require("../../shared/helper/utility");
const AdminRepository = require("../admin/admin.repository");

class AuthService {
  constructor() {
    this.adminRepository = new AdminRepository();
    this.jwt = new JWTToken();
  }

  /**
   * admin login auth service
   * @param {{username: string, password: string}} body
   */
  async adminLogin(body) {
    const admin = await this.adminRepository.findByUsername(body.username);

    if (!admin) {
      throw new CustomError(401, "Incorrect username or password!");
    }

    const check = await compaire(admin.password, body.password);
    if (!check) {
      throw new CustomError(401, "Incorrect username or password!");
    }

    const token = await this.jwt.generateToken(admin);
    return { ...admin, token };
  }
}

module.exports = AuthService;
