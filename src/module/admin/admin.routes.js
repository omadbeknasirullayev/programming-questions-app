const { CustomError } = require("../../shared/helper/lib");
const { rateLimiter } = require("../../shared/helper/utility");
const AdminController = require("./admin.controller");

class AdminRoute {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.controller = new AdminController(req, res);
  }

  async route() {
    try {
      await rateLimiter.consume(this.req.socket.remoteAddress);
      const method = this.req.method;
      const url = this.req.url;
      if (method == "POST" && url == "/admin/create") {
        await this.controller.create();
      } else {
        throw new CustomError(404, "This endpoint does not exist!")
      }
    } catch (error) {}
  }
}

module.exports = AdminRoute;
