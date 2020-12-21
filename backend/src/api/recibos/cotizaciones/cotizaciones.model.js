const BaseModel = require("../../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../../constants/string");

class Cotizacion extends BaseModel {
  static get tableName() {
    return tableNames.cotizacion;
  }

  static get relationMappings() {
    const Recibo_encabezado = require("../../noRoute/recibo_encabezados.model");
    const Linea_cotizacion = require("../linea_cotizaciones.model");
    return {
      encabezado: {
        relation: Model.BelongsToOneRelation,
        modelClass: Recibo_encabezado,
        join: {
          from: `${tableNames.cotizacion}.${tableNames.recibo_encabezado}_id`,
          to: `${tableNames.recibo_encabezado}.id`,
        },
      },

      lineas: {
        relation: Model.HasManyRelation,
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
        builder.select(
          "id",
          "recibo_encabezado_id",
          "total",
          "sub_total",
          "tax"
        );
      },
    };
  }
}

module.exports = Cotizacion;
