const fs = require("fs");
const path = require("path");
const { CustomError, ValidationError } = require("./make-errors");

/**
 * make understandable errors class
 * @param {unknown} error
 * @param {string} message
 */
class ErrorHandler {
  constructor(res, error) {
    this.res = res;
    this.error = error;
    this.#filterError();
  }

  #filterError() {
    let status = 0;
    let message = "";
    console.log(this.error);
    if (this.error instanceof CustomError) {
      status = this.error.statusCode;
      message = this.error.message;
    } else if (this.error instanceof ValidationError) {
      status = this.error.statusCode;
      message = this.error.message;
    } else {
      status = 500;
      message = "Internal server error";
    }

    this.res.writeHead(status, { "Content-Type": "application/json" });
    this.res.end(
      JSON.stringify({ statusCode: status, data: {}, message: message }),
    );
  }
}

module.exports = ErrorHandler;
