const { CustomError } = require("../../shared/helper/lib");
const { rateLimiter } = require("../../shared/helper/utility");
const QuestionController = require("./question.controller");

class QuestionRoute {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.controller = new QuestionController(req, res);
  }

  async route() {
    await rateLimiter.consume(this.req.socket.remoteAddress);

    const method = this.req.method;
    const url = this.req.url;

    if (method == "POST" && url == "/question/create") {
      await this.controller.create();
    } else if (method == "GET" && url == "/question/get-all") {
      await this.controller.findAll();
    } else if (method == "GET" && url.startsWith("/question/get-one/")) {
      await this.controller.findOne();
    } else if (method == "PATCH" && url.startsWith("/question/update/")) {
      await this.controller.update();
    } else if (method == "DELETE" && url.startsWith("/question/remove/")) {
      await this.controller.remove();
    } else {
      throw new CustomError(404, "This endpoint does not exist!");
    }
  }
}

module.exports = QuestionRoute;
