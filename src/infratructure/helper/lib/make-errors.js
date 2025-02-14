class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { CustomError, ValidationError };
