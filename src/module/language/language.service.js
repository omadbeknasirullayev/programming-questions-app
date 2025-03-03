const LanguageRepository = require("./language.repository");
const { CustomError } = require("../../shared/helper/lib");
const { LanguageModel } = require("../../model");

class LanguageService {
  constructor() {
    this.repository = new LanguageRepository();
  }

  /**
   * create language Service
   * @param {LanguageModel} data
   * @return {LanguageModel}
   */
  async create(data) {
    const result = await this.repository.create(data);
    return result;
  }

  /**
   * get one language Service
   * @param {number} id
   * @return {LanguageModel}
   */
  async getOne(id) {
    const data = await this.repository.getOne(id);
    if (!data) {
      throw new CustomError(404, "Not found language");
    }
    return data;
  }

  /**
   * get all language Service
   * @return {LanguageModel[]}
   */
  async getAll() {
    const data = await this.repository.getAll();
    return data;
  }

  /**
   * update language Service
   * @param {number} id
   * @param {LanguageModel} body
   */
  async update(id, body) {
    await this.getOne(id);
    const data = await this.repository.update(id, body);
    return data;
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
