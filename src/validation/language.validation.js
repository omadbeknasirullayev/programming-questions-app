class LanguageValidation {
  constructor(data) {
    this.data = data;
    this.error = [];
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

  async getOneValidate() {
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

module.exports = LanguageValidation;
