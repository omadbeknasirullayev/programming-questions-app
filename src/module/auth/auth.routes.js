const { CustomError, ErrorHandler } = require("../../shared/helper/lib");
const { rateLimiter } = require("../../shared/helper/utility");
const AuthController = require("./auth.controller");

class AuthRoute {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.controller = new AuthController(req, res);
  }

  async route() {
    try {
      await rateLimiter.consume(this.req.socket.remoteAddress);
      const method = this.req.method;
      const url = this.req.url;
      if (method == "POST" && url == "/auth/admin-login") {
        await this.controller.adminLogin();
      } else {
        throw new CustomError(404, "This endpoint does not exist!");
      }
    } catch (error) {
      await new ErrorHandler(this.res, error);
    }
  }
}

module.exports = AuthRoute;
