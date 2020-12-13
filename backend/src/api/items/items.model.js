const { Model } = require("objection");
const { tableNames } = require("../../constants/string");

class Item extends Model {
  static get tableName() {
    return tableNames.item;
  }

  static get relationMappings() {
    const Item_inventario_Log = require("../logs/item/item_inventario_logs.model");
    const Item_inventario = require("../items/item_inventarios/item_inventarios.model");
    const Categoria = require("../noRoute/categorias.model");
    return {
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Item_inventario_Log,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.item_inventario_log}.${tableNames.item}_id`,
        },
      },
      inventarios: {
        relation: Model.HasManyRelation,
        modelClass: Item_inventario,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.item_inventario}.${tableNames.item}_id`,
        },
      },
      categoria: {
        relation: Model.BelongsToOneRelation,
        modelClass: Categoria,
        join: {
          from: `${tableNames.item}.${tableNames.categoria}_id`,
          to: `${tableNames.categoria}.id`,
        },
      },
      categoria2: {
        relation: Model.BelongsToOneRelation,
        modelClass: Categoria,
        join: {
          from: `${tableNames.item}.${tableNames.categoria}_2_id`,
          to: `${tableNames.categoria}.id`,
        },
      },
    };
  }
}

module.exports = Item;
