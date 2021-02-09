const BaseModel = require("./BaseModel");
const { tableNames } = require("../constants/string");

class Logo extends BaseModel {
  static get tableName() {
    return tableNames.logos;
  }
}

module.exports = Logo;
