const { CategoryModel } = require("../../model");
const { CustomError } = require("../../shared/helper/lib");
const CategoryRepository = require("./category.repository");

class CategoryService {
  constructor() {
    this.repository = new CategoryRepository();
  }

  /**
   * create category service
   * @param {CategoryModel} body
   * @return {CategoryModel}
   */
  async create(body) {
    const check = await this.repository.findByNameAndLanguageIdAndLevelId(body);
    if (check) {
      throw new CustomError(409, "This category already exists!");
    }

    const data = await this.repository.create(body);
    return data;
  }

  /**
   * find all category service
   * @return {CategoryModel[]}
   */
  async findAll() {
    const data = await this.repository.findAll();
    return data;
  }

  /**
   * find one category service
   * @param {number} id
   * @return {CategoryModel}
   */
  async findOne(id) {
    const data = await this.repository.findOne(id);
    if (!data) {
      throw new CustomError(404, "Category not found!");
    }
    return data;
  }

  /**
   * update category Service
   * @param {number} id
   * @param {CategoryModel} body
   */
  async update(id, body) {
    const category = await this.findOne(id);
    let check = undefined;
    let where_condition = {}
    if (body.name || body.languageId || body.levelId) {
      where_condition.name = body.name || category.name
      where_condition.languageId = body.languageId || category.languageId
      where_condition.levelId = body.levelId || category.levelId
    }

    check = await this.repository.findByNameAndLanguageIdAndLevelId(where_condition);

    if (check) {
      throw new CustomError(409, "This category already exists!");
    }
    const data = await this.repository.update(id, body);
    return data;
  }

  /**
   * delete category Service
   * @param {number} id
   */
  async remove(id) {
    await this.findOne(id);
    const data = await this.repository.remove(id);
    return data;
  }
}

module.exports = CategoryService;
