const { tableNames } = require("../../../constants/string");
const BaseModel = require("../../BaseModel");

class Linea_devolucion extends BaseModel {
  static get tableName() {
    return tableNames.linea_devolucion;
  }

  static get relationMappings() {
    const Item = require("../../items/items.model");
    const Garantia = require("../garantias/garantias.model");
    const Devolucion = require("./devoluciones.model");
    return {
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.linea_devolucion}.salida_${tableNames.item}_id`,
        },
      },
      itemSalida: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.linea_devolucion}.salida_${tableNames.item}_id`,
        },
      },
      itemEntrada: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.item}_id`,
        },
      },

      garantia: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Garantia,
        join: {
          from: `${tableNames.garantia}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.garantia}_id`,
        },
      },
      devolucion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Devolucion,
        join: {
          from: `${tableNames.devolucion}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.devolucion}_id`,
        },
      },
    };
  }
}

module.exports = Linea_devolucion;
