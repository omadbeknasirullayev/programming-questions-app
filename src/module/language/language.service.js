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
    try {
      const result = await this.repository.create(data);
      await this.repository.closeDb();
      return result;
    } catch (error) {
      await this.repository.closeDb();
      throw error;
    }
  }

  /**
   * get one language Service
   * @param {number} id
   * @return {LanguageModel}
   */
  async getOne(id) {
    try {
      const data = await this.repository.getOne(id);

      if (!data) {
        throw new CustomError(404, "Not found language");
      }

      await this.repository.closeDb();
      return data;
    } catch (error) {
      await this.repository.closeDb();
      throw error;
    }
  }

  /**
   * get all language Service
   * @return {LanguageModel[]}
   */
  async getAll() {
    try {
      const data = await this.repository.getAll();
      await this.repository.closeDb();
      return data;
    } catch (error) {
      await this.repository.closeDb();
      throw error;
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
      await this.repository.closeDb();
      return data;
    } catch (error) {
      await this.repository.closeDb();
      throw error;
    }
  }

  /**
   * delete language Service
   * @param {number} id
   */
  async remove(id) {
    try {
      await this.getOne(id);

      const data = await this.repository.remove(id);
      await this.repository.closeDb();
      return data;
    } catch (error) {
      await this.repository.closeDb();
      throw error;
    }
  }
}

module.exports = LanguageService;
