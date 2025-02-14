const { LanguageRepository } = require("../repository");
const { CustomError, ErrorHandler } = require("../infratructure/helper/lib");
const { LanguageModel } = require("../model");

class LanguageCreateService {
  constructor(res, repository) {
    this.res = res;
    this.repository = repository
  }

  /**
   * create language Service
   * @param {LanguageModel} data
   * @return {LanguageModel}
   */
  async create(data) {
    try {
      const result = await this.repository.create(data);
      return result;
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }
}

module.exports = LanguageCreateService;
