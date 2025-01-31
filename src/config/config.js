require('dotenv').config()
const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = require('process').env

module.exports = {
  port: PORT,
  db_host: DB_HOST,
  db_port: DB_PORT,
  db_user: DB_USER,
  db_password: DB_PASSWORD,
  db_name: DB_NAME
}