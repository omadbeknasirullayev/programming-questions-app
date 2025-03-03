const jwt = require("jsonwebtoken");
const config = require("../../../config/config");
const { AdminModel } = require("../../../model");
const { CustomError } = require("./make-errors");

class JWTToken {
  constructor() {}

  /**
   * generate token
   * @param {AdminModel} user
   * @return {string}
   */
  async generateToken(user) {
    const payload = {
      id: user.id,
      role: user.role,
    };

    const token = await jwt.sign(payload, config.token_key, {
      expiresIn: config.token_time,
    });

    return token;
  }

  /** compire token */
  async verifyToken(token) {
    try {
      const payload = await jwt.verify(token, config.token_key);
      return payload;
    } catch (error) {
      throw new CustomError(401, "Unauthorized!");
    }
  }
}

module.exports = JWTToken;
