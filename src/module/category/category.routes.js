const { CustomError } = require("../../shared/helper/lib");
const { rateLimiter } = require("../../shared/helper/utility");
const CategoryController = require("./category.controller");

class CategoryRoute {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.controller = new CategoryController(req, res);
  }

  async route() {
    await rateLimiter.consume(this.req.socket.remoteAddress);

    const method = this.req.method;
    const url = this.req.url;

    if (method == "POST" && url == "/category/create") {
      await this.controller.create();
    } else if (method == "GET" && url == "/category/get-all") {
      await this.controller.findAll();
    } else if (method == "GET" && url.startsWith("/category/get-one/")) {
      await this.controller.findOne();
    } else if (method == "PATCH" && url.startsWith("/category/update/")) {
      await this.controller.update();
    } else if (method == "DELETE" && url.startsWith("/category/remove/")) {
      await this.controller.remove();
    } else {
      throw new CustomError(404, "This endpoint does not exist!");
    }
  }
}

module.exports = CategoryRoute;
