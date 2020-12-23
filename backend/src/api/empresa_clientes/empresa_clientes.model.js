const BaseModel = require("../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../constants/string");

class Empresa_cliente extends BaseModel {
  static get tableName() {
    return tableNames.empresa_cliente;
  }
}

module.exports = Empresa_cliente;
