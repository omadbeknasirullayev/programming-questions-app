const { LanguageValidation } = require("../validation")
const { LanguageService } = require('../service')
const { bodyParser } = require('../lib')
const ErrorHandler = require('../lib/erro-handler')

class LanguageController {
  constructor(req, res) {
    this.req = req
    this.res = res
  }

  /** create language controller */
  async create() {
    try {
      const data = await bodyParser(req)

      const languageValidation = new LanguageValidation(data)
      await languageValidation.createValidate()

      if (languageValidation.isValid()) {
        this.res.writeHead(400, { 'Content-Type': 'application/json' })
        this.res.end(JSON.stringify({ message: languageValidation.getErrors() }))
      } else {
        const result = await new LanguageService(req, res).create(data)
        this.res.writeHead(201, { 'Content-Type': 'application/json' })
        this.res.end(JSON.stringify({ statusCode: 201, data: result, message: 'success' }))
      }
    } catch (error) {
      new ErrorHandler(this.res, error, error.message)
    }
  }

  /** get one language controller*/
  async getOne() {
    try {
      const param = this.req.url.split('/')[3]
      const validate = new LanguageValidation(param)
      await validate.getOneValidate()

      if (validate.isValid()) {
        this.res.writeHead(400, { 'Content-Type': 'application/json' })
        this.res.end(JSON.stringify({ message: validate.getErrors() }))
      }

      await new LanguageService(this.req, this.res).getOne(param)
    } catch (error) {
      console.log(error);
    }
  }

  /** get all language controller */
  async getAll() {
    try {
      await new LanguageService(this.req, this.res).getAll()
    } catch (error) {
      console.log(error);
    }
  }

  /** delete language controller */
  async delete(param) {

  }
}

module.exports = LanguageController