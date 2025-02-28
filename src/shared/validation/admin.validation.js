const BaseValidation = require("./base.validation");
const { StringValidation } = require("./validators");

class AdminValidation extends BaseValidation {
  constructor(data) {
    super(data, [StringValidation]);
  }

  /** Create validation */
  async createValidation() {
    try {
      allowedFields = ["fullname", "username", "password"];
      this.checkExtraFields(allowedFields); // Keraksiz fieldlarni tekshiramiz

      this.isString(this.data.fullname, "fullname");
      this.isString(this.data.username, "username");
      this.isString(this.data.password, "password");
    } catch (error) {
      console.error(error);
    }
  }

  /** Update validation */
  async updateValidation() {
    try {
      allowedFields = ["fullname", "username", "password"];
      this.checkExtraFields(allowedFields);

      if (Object.keys(this.data).length === 0) {
        this.error.push("At least one field is required for update.");
      }

      if (this.data.fullname !== undefined) {
        this.isString(this.data.fullname, "fullname");
      }
      if (this.data.username !== undefined) {
        this.isString(this.data.username, "username");
      }
      if (this.data.password !== undefined) {
        this.isString(this.data.password, "password");
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = AdminValidation;
