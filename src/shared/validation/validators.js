const StringValidation = {
  isString(field, fieldName) {
    if (!field || typeof field !== "string") {
      this.errors.push(`${fieldName} must be a valid string`);
      return false;
    }
    return true;
  },
};

const NumberValidation = {
  isNumber(field, fieldName) {
    console.log(999999, this);
    if (field === undefined || typeof field !== "number" || isNaN(field)) {
      this.error.push(`${fieldName} must be a valid number`);
      return false;
    }
    return true;
  },
};

const NumberStringValidation = {
  isNumberString(field, fieldName) {
    console.log(!field);
    if (!field || field === undefined || isNaN(field)) {
      this.error.push(`${fieldName} must be a valid number`);
      return false;
    }
    return true;
  },
};

// Yangi validatsiyalarni qo‘shish mumkin
const EmailValidation = {
  isEmail(field, fieldName) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!field || typeof field !== "string" || !emailRegex.test(field)) {
      this.errors.push(`${fieldName} must be a valid email`);
      return false;
    }
    return true;
  },
};

const BooleanValidation = {
  isBoolean(field, fieldName) {
    if (typeof field !== "boolean") {
      this.errors.push(`${fieldName} must be a boolean value`);
      return false;
    }
    return true;
  },
};

module.exports = {
  StringValidation,
  NumberValidation,
  EmailValidation,
  BooleanValidation,
  NumberStringValidation,
};
