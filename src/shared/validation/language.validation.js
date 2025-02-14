const BaseValidation = require("./base.validation");

class LanguageValidation extends BaseValidation {
  constructor(data) {
    super(data, [])
  }

  async createValidate() {
    try {
      if (!this.data.name || typeof this.data.name !== "string") {
        this.error.push("name field must be string");
      }

      if (!this.data.position || typeof this.data.position !== "number") {
        this.error.push("order field must be number");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateValidation() {
    try {
      if (Object.keys(this.data).length === 0) {
        this.error.push("At least one field is required for update.");
      }

      if (this.data.name !== undefined && typeof this.data.name !== "string") {
        this.error.push("name field must be string");
      }

      if (
        this.data.position !== undefined &&
        typeof this.data.position !== "number"
      ) {
        this.error.push("position field must be number");
      }
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = LanguageValidation;
