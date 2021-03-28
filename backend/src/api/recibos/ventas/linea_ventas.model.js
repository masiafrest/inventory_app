const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Linea_venta extends BaseModel {
  static get tableName() {
    return tableNames.linea_venta;
  }

  static get relationMappings() {
    const Venta = require("./ventas.model");
    const Item = require("../../items/items.model");
    return {
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.linea_venta}.${tableNames.item}_id`,
        },
      },
      venta: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Venta,
        join: {
          from: `${tableNames.venta}.id`,
          to: `${tableNames.linea_venta}.${tableNames.venta}_id`,
        },
      },
    };
  }
}

module.exports = Linea_venta;
