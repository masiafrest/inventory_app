const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Linea_cotizacion extends BaseModel {
  static get tableName() {
    return tableNames.linea_cotizacion;
  }

  static get relationMappings() {
    const Cotizacion = require("./cotizaciones.model");
    const Inventario = require("../../items/inventarios/inventarios.model");
    return {
      cotizacion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Cotizacion,
        join: {
          from: `${tableNames.cotizacion}.id`,
          to: `${tableNames.linea_cotizacion}.${tableNames.cotizacion}_id`,
        },
      },
      inventario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.inventario}.id`,
          to: `${tableNames.linea_cotizacion}.${tableNames.inventario}_id`,
        },
      },
    };
  }
}

module.exports = Linea_cotizacion;
