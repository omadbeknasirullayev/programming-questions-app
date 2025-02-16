const jwt = require("jsonwebtoken");
const { AdminModel } = require("../../../model");
const config = require("../../../config/config");
const ErrorHandler = require("./erro-handler");

class JWTToken {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  /**
   * generate token
   * @param {AdminModel} user
   * @return {string}
   */
  async generateToken(user) {
    try {
      const payload = {
        id: user.id,
        role: user.role,
      };

      const token = await jwt.sign(payload, config.token_key, {
        expiresIn: config.token_time,
      });

      return token;
    } catch (error) {
      await new ErrorHandler(this.res, error);
    }
  }

  /** compire token */
  async verifyToken(token) {
    try {
      const payload = await jwt.verify(token, config.token_key);
      return payload;
    } catch (error) {}
  }
}

module.exports = JWTToken;
