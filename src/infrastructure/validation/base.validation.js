class BaseValidation {
  constructor(data) {
    this.data = data;
    this.error = [];
  }

  async getOneParamValidate() {
    try {
      if (!/^[0-9]+$/.test(this.data)) {
        this.error.push("Param must be number");
      }
    } catch (error) {
      console.log(error);
    }
  }

  getErrors() {
    return this.error;
  }

  isValid() {
    return this.error.length;
  }
}

module.exports = BaseValidation