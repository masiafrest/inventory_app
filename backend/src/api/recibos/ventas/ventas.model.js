const { tableNames } = require("../../../constants/string");
const BaseModel = require("../../BaseModel");
const Pago = require("../../noRoute/pagos.model");

class Venta extends BaseModel {
  static get tableName() {
    return tableNames.venta;
  }

  static get relationMappings() {
    const Linea_venta = require("./linea_ventas.model");
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
