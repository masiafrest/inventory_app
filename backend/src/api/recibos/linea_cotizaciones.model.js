const BaseModel = require("../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../constants/string");
//TODO resolver si tneer venta y cotizaciones por separado
class Linea_venta_cotizacion extends BaseModel {
  static get tableName() {
    return tableNames.linea_venta_cotizacion;
  }

  static get relationMappings() {
    const Cotizacion = require("./cotizaciones/cotizaciones.model");
    const Inventario = require("../items/inventarios/inventarios.model");
    return {
      cotizacion: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cotizacion,
        join: {
          from: `${tableNames.cotizacion}.id`,
          to: `${tableNames.linea_venta_cotizacion}.${tableNames.cotizacion}_id`,
        },
      },
      inventario: {
        relation: Model.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.inventario}.id`,
          to: `${tableNames.linea_venta_cotizacion}.${tableNames.item}_id`,
        },
      },
    };
  }
}

module.exports = Linea_venta_cotizacion;
