const LanguageController = require("./language.controller");
const { rateLimiter } = require("../../shared/helper/utility");
const { CustomError } = require("../../shared/helper/lib");

class LanguageRoute {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.controller = new LanguageController(req, res);
  }

  async route() {
    await rateLimiter.consume(this.req.socket.remoteAddress);

    let method = this.req.method;
    let url = this.req.url;

    if (method == "POST" && url == "/language/create") {
      await this.controller.create();
    } else if (method == "GET" && url.startsWith("/language/get-one/")) {
      await this.controller.getOne();
    } else if (method == "GET" && url.startsWith("/language/get-all")) {
      await this.controller.getAll();
    } else if (method == "PATCH" && url.startsWith("/language/update/")) {
      await this.controller.update();
    } else if (method == "DELETE" && url.startsWith("/language/remove/")) {
      await this.controller.remove();
    } else {
      throw new CustomError(404, "This endpoint does not exist!");
    }
  }
}

module.exports = LanguageRoute;
