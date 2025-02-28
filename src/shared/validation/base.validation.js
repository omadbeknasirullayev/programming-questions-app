class BaseValidation {
  constructor(data, validators) {
    this.data = data;
    this.error = [];
    Object.assign(this, ...validators);
  }

  async getOneParamValidate() {
    try {
      if (!/^[0-9]+$/.test(this.data)) {
        this.error.push("Param must be number");
      }
    } catch (error) {
      throw error;
    }
  }

  getErrors() {
    return this.error;
  }

  isValid() {
    return this.error.length;
  }
  /**
   * Keraksiz fieldlarni tekshirish
   * @param {string[]} allowedFields
   */
  checkExtraFields(allowedFields) {
    const receivedFields = Object.keys(this.data);
    const extraFields = receivedFields.filter(
      (field) => !allowedFields.includes(field),
    );

    if (extraFields.length > 0) {
      this.error.push(`Extra fields sent: ${extraFields.join(", ")}`);
    }
  }
}

module.exports = BaseValidation;
