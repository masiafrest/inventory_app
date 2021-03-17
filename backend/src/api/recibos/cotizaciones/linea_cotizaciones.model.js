const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Linea_cotizacion extends BaseModel {
  static get tableName() {
    return tableNames.linea_cotizacion;
  }

  static get relationMappings() {
    const Cotizacion = require("./cotizaciones.model");
    const Item = require("../../items/items.model");
    return {
      cotizacion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Cotizacion,
        join: {
          from: `${tableNames.cotizacion}.id`,
          to: `${tableNames.linea_cotizacion}.${tableNames.cotizacion}_id`,
        },
      },
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item_log}.id`,
          to: `${tableNames.linea_cotizacion}.${tableNames.item}_id`,
        },
      },
    };
  }
}

module.exports = Linea_cotizacion;
