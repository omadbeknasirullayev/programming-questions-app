const fs = require("fs");
const path = require("path");
const CustomError = require('./custom-error')

/**
 * make understandable errors class
 * @param {unknown} error
 * @param {string} message
 */
class ErrorHandler {
  constructor(res, error, message) {
    this.res = res
    this.error = error
    this.message = message
    this.#filterError()
  }

  #filterError() {
    console.log(438473847384, this.error);
    let status = 0
    let message = ''
    if (this.error instanceof CustomError) {
      console.log(error);
    } else if (this.error instanceof ReferenceError) {
      status = 500
      message = "Internal server error"
    } else if (this.error instanceof SyntaxError) {

      status = 500
      message = "Internal server error"
    } else if (this.message == 'not found') {
      status = 404
      message = "Data not found"
    } else if (this.message == 'bad request') {
      status = 400
      message = this.message
    }

    this.res.writeHead(status, { 'Content-Type': 'application/json' })
    this.res.end(JSON.stringify({ statusCode: status, data: message, message: 'error' }))
  }
}

module.exports = ErrorHandler