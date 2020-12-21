const { tableNames } = require("../../../constants/string");
const BaseModel = require("../../BaseModel");
const { Model } = require("objection");

class Venta extends BaseModel {
  static get tableName() {
    return tableNames.transferencia;
  }

  static get relationMappings() {
    const Linea_tranferencia = require("../linea_tranferencias.model");
    return {
      lineas: {
        relation: Model.HasManyRelation,
        modelClass: Linea_tranferencia,
        join: {
          from: `${tableNames.transferencia}.id`,
          to: `${tableNames.linea_transferencia}.${tableNames.transferencia}_id`,
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
