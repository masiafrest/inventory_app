const { tableNames } = require("../../../constants/string");
const BaseModel = require("../../BaseModel");

class Venta extends BaseModel {
  static get tableName() {
    return tableNames.venta;
  }

  static get relationMappings() {
    const Linea_venta = require("./linea_ventas.model");
    const Item_log = require("../../items/logs/item_logs.model");
    const Pago = require("../../noRoute/pagos.model");
    const Empresa_cliente = require("../../empresa_clientes/empresa_clientes.model");
    const Usuario = require("../../usuarios/usuarios.model");
    return {
      cliente: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Empresa_cliente,
        join: {
          from: `${tableNames.venta}.empresa_cliente_id`,
          to: `${tableNames.empresa_cliente}.id`,
        },
      },

      usuario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.venta}.usuario_id`,
          to: `${tableNames.usuario}.id`,
        },
      },
      lineas: {
        relation: BaseModel.HasManyRelation,
        modelClass: Linea_venta,
        join: {
          from: `${tableNames.venta}.id`,
          to: `${tableNames.linea_venta}.${tableNames.venta}_id`,
        },
      },
      pago: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Pago,
        join: {
          from: `${tableNames.venta}.${tableNames.pago}_id`,
          to: `${tableNames.pago}.id`,
        },
      },
      inv_logs: {
        relation: BaseModel.HasManyRelation,
        modelClass: Item_log,
        join: {
          from: `${tableNames.venta}.id`,
          to: `${tableNames.item_log}.recibo_evento_id`,
        },
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "id",
          "total",
          "sub_total",
          "tax",
          "pagado",
          "entregado",
          "pago_id",
          "created_at"
        );
      },
    };
  }
}

module.exports = Venta;
