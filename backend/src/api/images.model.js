const BaseModel = require("./BaseModel");
const { tableNames } = require("../constants/string");

class Image extends BaseModel {
  static get tableName() {
    return tableNames.images;
  }
}

module.exports = Image;
