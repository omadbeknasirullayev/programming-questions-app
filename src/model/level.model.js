class LevelModel {
  constructor(id, name, position, languageId) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.languageId = languageId;
    this.createdAt = new Date();
    this.updatedAt = null;
  }
}

module.exports = LevelModel;
