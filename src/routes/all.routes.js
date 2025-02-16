const AdminRoute = require("../module/admin/admin.routes");
const AuthRoute = require("../module/auth/auth.routes");
const LanguageRoute = require("../module/language/language.routes");
const { CustomError, ErrorHandler } = require("../shared/helper/lib");

class AllRoutes {
  static async route(req, res) {
    try {
      if (req.url.startsWith("/auth/")) {
        await new AuthRoute(req, res).route();
      } else if (req.url.startsWith("/admin/")) {
        await new AdminRoute(req, res).route();
      } else if (req.url.startsWith("/language/")) {
        await new LanguageRoute(req, res).route();
      } else {
        throw new CustomError(404, "This endpoint does not exists!");
      }
    } catch (error) {
      await new ErrorHandler(res, error);
    }
  }
}

module.exports = AllRoutes;
