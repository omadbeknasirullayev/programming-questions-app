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
      // if (!this.data.name || typeof this.data.name !== "string") {
      //   this.error.push("name field must be string");
      // }

      // if (!this.data.position || typeof this.data.position !== "number") {
      //   this.error.push("order field must be number");
      // }
    } catch (error) {
      console.log(error);
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
      console.log(error);
      throw error;
    }
  }
}

module.exports = LanguageValidation;
