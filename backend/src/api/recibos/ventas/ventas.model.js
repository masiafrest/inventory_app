const { tableNames } = require("../../../constants/string");
const BaseModel = require("../../BaseModel");

class Venta extends BaseModel {
  static get tableName() {
    return tableNames.venta;
  }

  static get relationMappings() {
    const Linea_venta = require("./linea_ventas.model");
    const Inventario_log = require("../../items/inventarios/logs/inventario_logs.model");
    const Pago = require("../../noRoute/pagos.model");
    return {
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
        modelClass: Inventario_log,
        join: {
          from: `${tableNames.venta}.id`,
          to: `${tableNames.inventario_log}.${tableNames.venta}_id`,
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
