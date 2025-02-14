const BaseValidation = require("./base.validation");

class AdminValidation extends BaseValidation {
  constructor(data) {
    super(data, [])
  }

  /** create validation */
  async createValidation() {
    try {
      if (!this.data.fullname && typeof this.data.fullaname !== "string") {
        this.error.push("fullname must be a string!")
      }

      if (!this.data.username && typeof this.data.username !== "string") {
        this.error.push("username must be a string")
      }

      if (!this.data.password && typeof this.data.password !== "string") {
        this.error.push("password must be a string")
      }

    } catch (error) {
      
    }
  }
}

module.exports = AdminValidation