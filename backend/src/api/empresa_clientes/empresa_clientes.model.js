const BaseModel = require("../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../constants/string");

class Empresa_cliente extends BaseModel {
  static get tableName() {
    return tableNames.empresa_cliente;
  }

  static get relationMappings() {
    const Recibo_encabezado = require("../noRoute/recibo_encabezados.model");
    return {
      encabezados: {
        relation: Model.HasManyRelation,
        modelClass: Recibo_encabezado,
        join: {
          from: `${tableNames.empresa_cliente}.id`,
          to: `${tableNames.recibo_encabezado}.${tableNames.empresa_cliente}_id`,
        },
      },
    };
  }
}

module.exports = Empresa_cliente;
