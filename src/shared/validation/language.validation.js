const BaseValidation = require("./base.validation");
const { StringValidation, NumberValidation } = require("./validators");

class LanguageValidation extends BaseValidation {
  constructor(data) {
    super(data, [StringValidation, NumberValidation]);
  }

  async createValidate() {
    try {
      allowedFields = ["name", "position"];
      this.checkExtraFields(allowedFields);
      this.isString(this.name, "name");
      this.isNumber(this.position, "position");
    } catch (error) {
      throw error;
    }
  }

  async updateValidation() {
    try {
      allowedFields = ["name", "position"];
      this.checkExtraFields(allowedFields);

      if (Object.keys(this.data).length === 0) {
        this.error.push("At least one field is required for update.");
      }

      if (this.data.name !== undefined) {
        this.isString(this.data.name);
      }

      if (this.data.position !== undefined) {
        this.isNumber(this.data.position);
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LanguageValidation;
