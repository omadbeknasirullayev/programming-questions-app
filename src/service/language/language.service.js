const db = require('../../config/postgres-client')

/** Language Service */
class LanguageService {
  constructor(req, res) {
    this.req = req
    this.res = res
    this.db = new db()
  }

  /** create language service */
  async create(body) {
    try {
      const query = `INSERT INTO languages(name, position) VALUES($1, $2) RETURNING *;`
      const db = await this.db.query(query, [body.name, body.position])

      this.res.writeHead(201, { 'Content-Type': 'application/json' })
      this.res.end(JSON.stringify({ statusCode: 201, data: db, message: 'success' }))
    } catch (error) {
      console.log(error);
    }
  }

  /** get one language service */
  async getOne(param) {
    try {
      const query = `SELECT * FROM languages WHERE id = ${param}`
      const data = await this.db.query(query)

      if (!data[0]) {
        this.res.writeHead(404, { 'Content-Type': 'application/json' })
        this.res.end(JSON.stringify({ statusCode: 404, data: {}, message: `Not found language by ID` }))
      }

      this.res.writeHead(200, { 'Content-Type': 'application/json' })
      this.res.end(JSON.stringify({ statusCode: 200, data: data[0], message: 'success' }))

    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = LanguageService