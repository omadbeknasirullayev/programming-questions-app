class UserModel {
  constructor(fullaname, email, password, role = 'user') {
    this.fullaname = fullaname
    this.email = email
    this.password = password
    this.role = role
    this.createdAt = new Date()
    this.updatedAt = null
  }
}

module.exports = UserModel