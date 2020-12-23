const { tableNames } = require("../../../constants/string");
const BaseModel = require("../../BaseModel");
const { Model } = require("objection");
const Pago = require("../../noRoute/pagos.model");

class Venta extends BaseModel {
  static get tableName() {
    return tableNames.venta;
  }

  static get relationMappings() {
    const Linea_venta = require("./linea_ventas.model");
    return {
      lineas: {
        relation: Model.HasManyRelation,
        modelClass: Linea_venta,
        join: {
          from: `${tableNames.venta}.id`,
          to: `${tableNames.linea_venta}.${tableNames.venta}_id`,
        },
      },
      pago: {
        relatio: Model.BelongsToOneRelation,
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
