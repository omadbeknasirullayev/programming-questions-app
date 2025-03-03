const { LevelModel } = require("../../model");
const { CustomError } = require("../../shared/helper/lib");
const LevelRepository = require("./level.repository");

class LevelService {
  constructor() {
    this.repository = new LevelRepository();
  }

  /**
   * create admin service
   * @param {LevelModel} body
   * @return {LevelModel}
   */
  async create(body) {
    const check = await this.repository.findByNameAndLanguageId(body);
    if (check) {
      throw new CustomError(409, "This level already exists!");
    }

    const data = await this.repository.create(body);
    return data;
  }

  /**
   * find all service
   * @return {LevelModel[]}
   */
  async findAll() {
    const data = await this.repository.findAll();
    return data;
  }

  /**
   * find one admin service
   * @param {number} id
   * @return {LevelModel}
   */
  async findOne(id) {
    const data = await this.repository.findOne(id);
    if (!data) {
      throw new CustomError(404, "Level not found!");
    }
    return data;
  }

  /**
   * update admin Service
   * @param {number} id
   * @param {LevelModel} body
   */
  async update(id, body) {
    const level = await this.findOne(id);
    let check = undefined;
    if (body.name && body.languageId) {
      check = await this.repository.findByNameAndLanguageId(body);
    } else if (body.name) {
      check = await this.repository.findByNameAndLanguageId({
        name: body.name,
        languageId: level.languageId,
      });
    }

    if (check) {
      throw new CustomError(409, "This level already exists!");
    }
    const data = await this.repository.update(id, body);
    return data;
  }

  /**
   * delete admin Service
   * @param {number} id
   */
  async remove(id) {
    await this.findOne(id);
    const data = await this.repository.remove(id);
    return data;
  }
}

module.exports = LevelService;
