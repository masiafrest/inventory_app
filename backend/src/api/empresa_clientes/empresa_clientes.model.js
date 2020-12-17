const BaseModel = require("objection");
const { tableNames } = require("../../constants/string");

class Empresa_cliente extends BaseModel {
  static get tableName() {
    return tableNames.empresa_clientes;
  }

  static get relationMappings() {
    const Recibo_encabezado = require("../noRoute/recibo_encabezados.model");
    return {
      encabezados: {
        relation: Model.HasManyRelation,
        modelClass: Recibo_encabezado,
        join: {
          from: "empresa_cliente.id",
          to: "recibo_encabezado.empresa_cliente_id",
        },
      },
    };
  }
}

module.exports = Empresa_cliente;
