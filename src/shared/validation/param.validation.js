const BaseValidation = require("./base.validation");
const { NumberStringValidation } = require("./validators");

class ParamValidation extends BaseValidation {
  constructor(data) {
    super(data, [NumberStringValidation]);
  }

  async check() {
    try {
      this.isNumberString(this.data, "id");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ParamValidation;
