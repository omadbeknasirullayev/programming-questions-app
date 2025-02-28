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
    try {
      let status = 0;
      let message = "";
      // console.log(this.error);
      if (this.error instanceof CustomError) {
        status = this.error.statusCode;
        message = this.error.message;
      } else if (this.error instanceof ValidationError) {
        status = this.error.statusCode;
        message = this.error.message;
      } else if (this.error.msBeforeNext) {
        status = 429;
        message = "To many requests, please tyr again later!";
      } else {
        status = 500;
        message = "Internal server error!";
      }

      console.log(4444444, this.error);

      this.res.writeHead(status, { "Content-Type": "application/json" });
      this.res.end(
        JSON.stringify({ statusCode: status, data: {}, message: message }),
      );
    } catch (error) {
      console.log(error);
      console.log("catch handler");
      this.res.writeHead(500, { "Content-Type": "application/json" });
      this.res.end(
        JSON.stringify({
          statusCode: 500,
          data: {},
          message: "Internal server error",
        }),
      );
    }
  }
}

module.exports = ErrorHandler;
