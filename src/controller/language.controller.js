const { LanguageValidation } = require("../validation")
const { LanguageService } = require('../service')
const { bodyParser } = require('../lib')
const url = require('url')



class LanguageController {
  constructor(req, res) {
    this.req = req
    this.res = res
  }

  /** create language */
  async create() {
    try {
      const data = await bodyParser(req)

      const languageValidation = new LanguageValidation(data)
      await languageValidation.createValidate()

      if (languageValidation.isValid()) {
        this.res.writeHead(400, { 'Content-Type': 'application/json' })
        this.res.end(JSON.stringify({ message: languageValidation.getErrors() }))

      } else {
        await new LanguageService(req, res).create(data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  /** get one language */
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
}

module.exports = LanguageController