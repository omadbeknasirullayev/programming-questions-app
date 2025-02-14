const LanguageRepository = require("./language.repository");
const { CustomError, ErrorHandler } = require("../../shared/helper/lib");
const { LanguageModel } = require("../../model");

class LanguageService {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.repository = new LanguageRepository(req, res);
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

  /**
   * update language Service
   * @param {number} id
   * @param {LanguageModel} body
   */
  async update(id, body) {
    try {
      await this.getOne(id);
      const data = await this.repository.update(id, body);
      return data;
    } catch (error) {
      new ErrorHandler(this.res, error);
    }
  }

  /**
   * delete language Service
   * @param {number} id
   */
  async remove(id) {
    await this.getOne(id);

    const data = await this.repository.remove(id);
    return data;
  }
}

module.exports = LanguageService;
