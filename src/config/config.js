require('dotenv').config()
const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, TOKEN_KEY, TOKEN_TIME } = require('process').env

module.exports = {
  port: PORT,
  db_host: DB_HOST,
  db_port: DB_PORT,
  db_user: DB_USER,
  db_password: DB_PASSWORD,
  db_name: DB_NAME,
  token_key: TOKEN_KEY,
  token_time: TOKEN_TIME
}