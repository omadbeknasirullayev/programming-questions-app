const AdminRoute = require("../module/admin/admin.routes");
const AuthRoute = require("../module/auth/auth.routes");
const CategoryRoute = require("../module/category/category.routes");
const LanguageRoute = require("../module/language/language.routes");
const LevelRoute = require("../module/level/level.routes");
const QuestionRoute = require("../module/question/question.routes");
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
      } else if (req.url.startsWith("/level/")) {
        await new LevelRoute(req, res).route();
      } else if (req.url.startsWith("/category/")) {
        await new CategoryRoute(req, res).route();
      } else if (req.url.startsWith("/question/")) {
        await new QuestionRoute(req, res).route();
      } else {
        throw new CustomError(404, "This endpoint does not exists!");
      }
    } catch (error) {
      await new ErrorHandler(res, error);
    }
  }
}

module.exports = AllRoutes;
