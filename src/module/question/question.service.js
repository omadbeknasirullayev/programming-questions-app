const { QuestionModel } = require("../../model");
const { CustomError } = require("../../shared/helper/lib");
const QuestionRepository = require("./question.repository");

class QuestionService {
  constructor() {
    this.repository = new QuestionRepository();
  }

  /**
   * create question service
   * @param {QuestionModel} body
   * @return {QuestionModel}
   */
  async create(body) {
    const check = await this.repository.findByOptions(body);
    if (check) {
      throw new CustomError(409, "This question already exists!");
    }

    const data = await this.repository.create(body);
    return data;
  }

  /**
   * find all question service
   * @return {QuestionModel[]}
   */
  async findAll() {
    const data = await this.repository.findAll();
    return data;
  }

  /**
   * find one question service
   * @param {number} id
   * @return {QuestionModel}
   */
  async findOne(id) {
    const data = await this.repository.findOne(id);
    if (!data) {
      throw new CustomError(404, "Question not found!");
    }
    return data;
  }

  /**
   * update question Service
   * @param {number} id
   * @param {QuestionModel} body
   */
  async update(id, body) {
    const question = await this.findOne(id);
    let check = undefined;
    let where_condition = {};
    if (body.name || body.languageId || body.levelId || body.categoryId) {
      where_condition.name = body.name || question.name;
      where_condition.languageId = body.languageId || question.languageId;
      where_condition.levelId = body.levelId || question.levelId;
      where_condition.categoryId = body.categoryId || question.categoryId;
    }

    check = await this.repository.findByOptions(
      where_condition,
    );

    if (check) {
      throw new CustomError(409, "This question already exists!");
    }
    const data = await this.repository.update(id, body);
    return data;
  }

  /**
   * delete question Service
   * @param {number} id
   */
  async remove(id) {
    await this.findOne(id);
    const data = await this.repository.remove(id);
    return data;
  }
}

module.exports = QuestionService;
