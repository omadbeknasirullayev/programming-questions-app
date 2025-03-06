class CategoryModel {
  constructor(id, name, position, languageId, levelId) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.languageId = languageId;
    this.levelId = levelId;
    this.createdAt = new Date();
    this.updatedAt = null;
  }
}

module.exports = CategoryModel;
