const { CustomError } = require("../../shared/helper/lib");
const { rateLimiter } = require("../../shared/helper/utility");
const LevelController = require("./level.controller");

class LevelRoute {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.controller = new LevelController(req, res);
  }

  async route() {
    await rateLimiter.consume(this.req.socket.remoteAddress);

    const method = this.req.method;
    const url = this.req.url;

    if (method == "POST" && url == "/level/create") {
      await this.controller.create();
    } else if (method == "GET" && url == "/level/get-all") {
      await this.controller.findAll();
    } else if (method == "GET" && url.startsWith("/level/get-one/")) {
      await this.controller.findOne();
    } else if (method == "PATCH" && url.startsWith("/level/update/")) {
      await this.controller.update();
    } else if (method == "DELETE" && url.startsWith("/admin/remove/")) {
      await this.controller.remove();
    } else {
      throw new CustomError(404, "This endpoint does not exist!");
    }
  }
}

module.exports = LevelRoute;
