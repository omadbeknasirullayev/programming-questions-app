const BaseValidation = require("./base.validation");
const { StringValidation, NumberValidation } = require("./validators");

class CategoryValidation extends BaseValidation {
  constructor(data) {
    super(data, [StringValidation, NumberValidation]);
  }

  /** Create validation */
  async createValidation() {
    try {
      let allowedFields = ["name", "position", "languageId", "levelId"];
      this.checkExtraFields(allowedFields);

      this.isString(this.data.name, "name");
      this.isNumber(this.data.position, "position");
      this.isNumber(this.data.languageId, "languageId");
      this.isNumber(this.data.languageId, "levelId");
    } catch (error) {
      throw error;
    }
  }

  /** Update validation */
  async updateValidation() {
    try {
      let allowedFields = ["name", "position", "langaugeId", "levelId"];
      this.checkExtraFields(allowedFields);

      if (Object.keys(this.data).length === 0) {
        this.error.push("At least one field is required for update.");
      }

      if (this.data.name !== undefined) {
        this.isString(this.data.name, "name");
      }
      if (this.data.position !== undefined) {
        this.isNumber(this.data.position, "position");
      }
      if (this.data.languageId !== undefined) {
        this.isNumber(this.data.languageId, "langaugeId");
      }
      if (this.data.levelId !== undefined) {
        this.isNumber(this.data.levelId, "levelId");
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoryValidation;
