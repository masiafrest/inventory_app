const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Linea_garantia extends BaseModel {
  static get tableName() {
    return tableNames.linea_garantia;
  }

  static get relationMappings() {
    const Garantia = require("../garantias/garantias.model");
    const Item = require("../../items/items.model");
    const Venta = require("../ventas/ventas.model");
    return {
      garantia: {
        relation: BaseBaseModel.BelongsToOneRelation,
        modelClass: Garantia,
        join: {
          from: `${tableNames.garantia}.id`,
          to: `${tableNames.linea_garantia}.${tableNames.garantia}_id`,
        },
      },
      venta: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Venta,
        join: {
          from: `${tableNames.venta}.id`,
          to: `${tableNames.linea_garantia}.${tableNames.venta}_id`,
        },
      },
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.linea_garantia}.${tableNames.item}_id`,
        },
      },
    };
  }
}

module.exports = Linea_garantia;
