const { tableNames } = require("../../../constants/string");
const BaseModel = require("../../BaseModel");
const { Model } = require("objection");

class Venta extends BaseModel {
  static get tableName() {
    return tableNames.venta;
  }

  static get relationMappings() {
    const Recibo_encabezado = require("../../noRoute/recibo_encabezados.model");
    const Linea_venta = require("../linea_ventas.model");
    return {
      encabezado: {
        relation: Model.BelongsToOneRelation,
        modelClass: Recibo_encabezado,
        join: {
          from: `${tableNames.venta}.${tableNames.recibo_encabezado}_id`,
          to: `${tableNames.recibo_encabezado}.id`,
        },
      },
      lineas: {
        relation: Model.HasManyRelation,
        modelClass: Linea_venta,
        join: {
          from: `${tableNames.venta}.id`,
          to: `${tableNames.linea_venta_cotizacion}.${tableNames.venta}_id`,
        },
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "id",
          "recibo_encabezado_id",
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
