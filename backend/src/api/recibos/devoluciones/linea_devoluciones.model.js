const BaseModel = require("objection");
const { tableNames } = require("../../constants/string");

class Linea_devolucion extends BaseModel {
  static get tableName() {
    return tableNames.linea_devolucion;
  }

  static get relationMappings() {
    const Garantia = require("./garantias/garantias.model");
    const Devolucion = require("./devoluciones/devoluciones.model");
    const Item = require("../items/items.model");
    return {
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
      item_entrada: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.item}_entrada_id`,
        },
      },
      item_salida: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.item}_salida_id`,
        },
      },
    };
  }
}

module.exports = Linea_devolucion;
