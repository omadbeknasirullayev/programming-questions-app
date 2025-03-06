class QuestionModel {
  constructor(id, name, position, languageId, levelId, categoryId) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.languageId = languageId;
    this.levelId = levelId;
    this.categoryId = categoryId;
    this.createdAt = new Date();
    this.updatedAt = null;
  }
}

module.exports = QuestionModel;
