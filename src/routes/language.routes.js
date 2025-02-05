const { LanguageController } = require('../controller')

class LanguageRoute {
  constructor(req, res) {
    this.req = req
    this.res = res
  }

  async route() {
    if (this.req.method == 'POST' && this.req.url == '/language/create') {
      await new LanguageController(this.req, this.res).create()
    } else if (this.req.method == 'GET' && this.req.url.startsWith('/language/get-one/')) {
      await new LanguageController(this.req, this.res).getOne()
    } else if (this.req.method == 'GET' && this.req.url.startsWith('language/get-all')) {
      await new LanguageController(this.req, this.res).getAll()
    }
  }
}

module.exports = LanguageRoute