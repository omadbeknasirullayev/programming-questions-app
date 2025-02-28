const BaseValidation = require("./base.validation");
const { StringValidation } = require("./validators");

class AuthValidation extends BaseValidation {
  constructor(data) {
    super(data, [StringValidation]);
  }

  /** create validation */
  async adminLoginValidation() {
    try {
      let allowedFields = ["username", "password"];
      this.checkExtraFields(allowedFields);
      this.isString(this.data.username);
      this.isString(this.data.password);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthValidation;
