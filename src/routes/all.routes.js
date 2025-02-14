const LanguageRoute = require("../module/language/language.routes");

class AllRoutes {
  static async route(req, res) {
    if (req.url.startsWith("/language/")) {
      await new LanguageRoute(req, res).route(req.method, req.url);
    } else if (req.url.startsWith("/user/")) {
    } else {
      console.log("else");
    }
  }
}

module.exports = AllRoutes;