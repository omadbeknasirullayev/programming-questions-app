const bcryptjs = require("bcryptjs");

function hashed(password) {
  return bcryptjs.hashSync(password, 7);
}

function compaire(oldPassword, newPassword) {
  return bcryptjs.compareSync(newPassword, oldPassword);
}

module.exports = {
  compaire, hashed
}
