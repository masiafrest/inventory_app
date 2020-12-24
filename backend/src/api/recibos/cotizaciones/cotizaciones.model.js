const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Cotizacion extends BaseModel {
  static get tableName() {
    return tableNames.cotizacion;
  }

  static get relationMappings() {
    const Linea_cotizacion = require("./linea_cotizaciones.model");
    return {
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
