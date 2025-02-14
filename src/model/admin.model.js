class AdminModel{
  constructor(fullname, username, password, role = "admin") {
    this.fullname = fullname
    this.username = username
    this.password = password
    this.role = role
    this.createdAt = new Date()
    this.updatedAt = null
  }
}

module.exports = AdminModel