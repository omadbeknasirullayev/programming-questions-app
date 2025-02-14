const LanguageController = require("./language.controller");
const { ErrorHandler } = require("../../shared/helper/lib");
const { rateLimiter } = require("../../shared/helper/utility");

class LanguageRoute {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.controller = new LanguageController(req, res);
  }

  async route(method, url) {
    try {
      await rateLimiter.consume(this.req.socket.remoteAddress);
      if (this.req.method == "POST" && this.req.url == "/language/create") {
        await this.controller.create();
      } else if (
        this.req.method == "GET" &&
        this.req.url.startsWith("/language/get-one/")
      ) {
        await this.controller.getOne();
      } else if (
        this.req.method == "GET" &&
        this.req.url.startsWith("/language/get-all")
      ) {
        await this.controller.getAll();
      } else if (method == "PATCH" && url.startsWith("/language/update/")) {
        // await this.controller.update();
      } else {
        console.log(this.req.method, this.req.url);
      }
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }
}

module.exports = LanguageRoute;
