const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Cotizacion extends BaseModel {
  static get tableName() {
    return tableNames.cotizacion;
  }

  static get relationMappings() {
    const Empresa_cliente = require("../../empresa_clientes/empresa_clientes.model");
    const Usuario = require("../../usuarios/usuarios.model");
    const Linea_cotizacion = require("./linea_cotizaciones.model");
    return {
      cliente: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Empresa_cliente,
        join: {
          from: `${tableNames.cotizacion}.empresa_cliente_id`,
          to: `${tableNames.empresa_cliente}.id`,
        },
      },

      usuario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.cotizacion}.usuario_id`,
          to: `${tableNames.usuario}.id`,
        },
      },
      lineas: {
        relation: BaseModel.HasManyRelation,
        modelClass: Linea_cotizacion,
        join: {
          from: `${tableNames.cotizacion}.id`,
          to: `${tableNames.linea_cotizacion}.${tableNames.cotizacion}_id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "total", "sub_total", "tax");
      },
    };
  }
}

module.exports = Cotizacion;
