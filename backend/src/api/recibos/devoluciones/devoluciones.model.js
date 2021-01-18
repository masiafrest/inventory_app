const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Devolucion extends BaseModel {
  static get tableName() {
    return tableNames.devolucion;
  }

  static get relationMappings() {
    const Usuario = require("../../usuarios/usuarios.model");
    const Empresa_cliente = require("../../empresa_clientes/empresa_clientes.model");
    const Linea_devolucion = require("./linea_devoluciones.model");
    return {
      usuario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.devolucion}.usuario_id`,
          to: `${tableNames.usuario}.id`,
        },
      },
      cliente: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Empresa_cliente,
        join: {
          from: `${tableNames.devolucion}.empresa_cliente_id`,
          to: `${tableNames.empresa_cliente}.id`,
        },
      },
      lineas: {
        relation: BaseModel.HasManyRelation,
        modelClass: Linea_devolucion,
        join: {
          from: `${tableNames.devolucion}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.devolucion}_id`,
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

module.exports = Devolucion;
