const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Garantia extends BaseModel {
  static get tableName() {
    return tableNames.garantia;
  }

  static get relationMappings() {
    const Empresa_cliente = require("../../empresa_clientes/empresa_clientes.model");
    const Usuario = require("../../usuarios/usuarios.model");
    const Linea_garantia = require("./linea_garantias.model");
    return {
      cliente: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Empresa_cliente,
        join: {
          from: `${tableNames.garantia}.empresa_cliente_id`,
          to: `${tableNames.empresa_cliente}.id`,
        },
      },
      usuario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.garantia}.usuario_id`,
          to: `${tableNames.usuario}.id`,
        },
      },
      lineas: {
        relation: BaseModel.HasManyRelation,
        modelClass: Linea_garantia,
        join: {
          from: `${tableNames.garantia}.id`,
          to: `${tableNames.linea_garantia}.${tableNames.garantia}_id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "total", "created_at");
      },
    };
  }
}

module.exports = Garantia;
