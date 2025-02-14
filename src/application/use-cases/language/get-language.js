const { LanguageRepository } = require("../repository");
const { CustomError, ErrorHandler } = require("../infratructure/helper/lib");
const { LanguageModel } = require("../model");

class LanguageGetService {
  constructor(res, repository) {
    this.res = res;
    this.repository = repository
  }

  /**
   * get one language Service
   * @param {number} id
   * @return {LanguageModel}
   */
  async getOne(id) {
    try {
      console.log(id);
      const data = await this.repository.getOne(id);

      if (!data) {
        throw new CustomError(404, "Not found language");
      }

      return data;
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }

  /**
   * get all language Service
   * @return {LanguageModel[]}
   */
  async getAll() {
    try {
      const data = await this.repository.getAll();
      return data;
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }

}

module.exports = LanguageGetService;
