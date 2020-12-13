const { Model } = require("objection");

const { tableNames } = require("../../constants/string");

class Categoria extends Model {
  static get tableName() {
    return tableNames.categoria;
  }
}

module.exports = Categoria;
