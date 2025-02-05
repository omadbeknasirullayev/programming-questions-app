const db = require('../../config/postgres-client')
const { LanguageModel } = require('../../model')
const ErrorHandler = require('../../lib/erro-handler')
const CustomError = require('../../lib/custom-error')

/** Language Service */
class LanguageService {
  constructor(req, res) {
    this.req = req
    this.res = res
    this.db = new db()
  }

  /** 
   * create language service 
   * @param {LanguageModel} body
   * @return {LanguageModel}
  */
  async create(body) {
    try {
      const query = `INSERT INTO languages(name, position) VALUES($1, $2) RETURNING *;`
      const db = await this.db.query(query, [body.name, body.position])
      return db
    } catch (error) {
      new ErrorHandler(this.res, error, error.message)
    }
  }

  /** get one language service */
  async getOne(param) {
    try {
      const query = `SELECT * FROM languages WHERE id = ${param}`
      const data = await this.db.query(query)

      if (!data[0]) {
        throw new CustomError(404, "Not found language")
        throw new Error("not found")
      }

      return data
    } catch (error) {
      console.log("error", error.message);
      new ErrorHandler(this.res, error, error.message)
    }
  }

  /** get one language service */
  async getAll() {
    try {
      const query = `SELECT * FROM languages`
      const data = await this.db.query(query)

      this.res.writeHead(200, { 'Content-Type': 'application/json' })
      this.res.end(JSON.stringify({ statusCode: 200, data: data[0], message: 'success' }))

    } catch (error) {
      new ErrorHandler(this.res, error, error.message)
    }
  }
}

module.exports = LanguageService