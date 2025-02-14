const jwt = require("jsonwebtoken")

const generateJwt = function (user) {
  return jwt.sign({id: user.id, role: user.role})
}