
const BaseValidation = require("./base.validation");

class AuthValidation extends BaseValidation {
  constructor(data) {
    super(data, []);
  }

  /** create validation */
  async adminLoginValidation() {
    try {

      if (!this.data.username && typeof this.data.username !== "string") {
        this.error.push("username must be a string");
      }

      if (!this.data.password && typeof this.data.password !== "string") {
        this.error.push("password must be a string");
      }
    } catch (error) {}
  }
}

module.exports = AuthValidation;