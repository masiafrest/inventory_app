const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Linea_nota_credito extends BaseModel {
  static get tableName() {
    return tableNames.linea_nota_credito;
  }

  static get relationMappings() {
    const Item = require("../../items/items.model");
    const Garantia = require("../garantias/garantias.model");
    const Nota_credito = require("../nota_creditos/nota_creditos.model");
    const Venta = require("../ventas/ventas.model");
    return {
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.linea_nota_credito}.${tableNames.item}_id`,
        },
      },

      garantia: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Garantia,
        join: {
          from: `${tableNames.garantia}.id`,
          to: `${tableNames.linea_nota_credito}.${tableNames.garantia}_id`,
        },
      },
      venta: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Venta,
        join: {
          from: `${tableNames.venta}.id`,
          to: `${tableNames.linea_nota_credito}.${tableNames.venta}_id`,
        },
      },
      nota_credito: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Nota_credito,
        join: {
          from: `${tableNames.nota_credito}.id`,
          to: `${tableNames.linea_nota_credito}.${tableNames.nota_credito}_id`,
        },
      },
    };
  }
}

module.exports = Linea_nota_credito;
