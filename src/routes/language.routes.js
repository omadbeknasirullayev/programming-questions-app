const { LanguageService } = require('../service')

class LanguageRoute {
  constructor(req, res) {
    this.req = req
    this.res = res
    this.service = new LanguageService(req, res)
  }

  async route() {
    if (this.req.method == 'POST' && this.req.url == '/language/create') {
      await this.service.create()
    } else if (this.req.method == 'GET' && this.req.url.startsWith('/language/get-one/')) {
      await this.service.getOne()
    } else if (this.req.method == 'GET' && this.req.url.startsWith('/language/get-all')) {
      await this.service.getAll()
    } else {
      console.log(this.req.method, this.req.url);
    }
  }
}

module.exports = LanguageRoute