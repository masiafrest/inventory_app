const BaseModel = require("./BaseModel");
const { tableNames } = require("../constants/string");

class Image extends BaseModel {
  static get tableName() {
    return tableNames.images;
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("url_path");
      },
    };
  }
}

module.exports = Image;
