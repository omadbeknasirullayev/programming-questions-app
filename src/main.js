const http = require('http')
const AllRoutes = require('./routes/all.routes')
require('dotenv').config()
const port = require('process').env.port || 3000


http.createServer(async (req, res) => {
  AllRoutes.route(req, res)
}).listen(port, () => {
  console.log(`server run on ${port}`);
})