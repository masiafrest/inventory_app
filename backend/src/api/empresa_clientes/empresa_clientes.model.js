const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");

class Empresa_cliente extends BaseModel {
  static get tableName() {
    return tableNames.empresa_cliente;
  }
  static get modifiers() {
    return {
      getNameAndId(builder) {
        builder.select("id", "nombre");
      },
    };
  }
}

module.exports = Empresa_cliente;
