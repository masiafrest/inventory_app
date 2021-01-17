const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");

class Empresa_cliente extends BaseModel {
  static get tableName() {
    return tableNames.empresa_cliente;
  }
  static get modifiers() {
    return {
      getName(builder) {
        builder
          .join("inventario_log", {
            "empresa_cliente.id": "inventario_log.empresa_cliente_id",
          })
          .select("empresa_cliente.nombre");
      },
    };
  }
}

module.exports = Empresa_cliente;
