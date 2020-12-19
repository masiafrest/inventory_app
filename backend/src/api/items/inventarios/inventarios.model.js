const BaseModel = require("../../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../../constants/string");

class Item_inventario extends BaseModel {
  static get tableName() {
    return tableNames.item_inventario;
  }

  static get relationMappings() {
    const Item = require("../items.model");
    const Lugar = require("../../lugares/lugares.model");
    const Precio = require("../../precio/precios.model");
    const Item_inventario_log = require("./logs/item_inventario_logs.model");
    //const Precio_log = require("../../precio/precio_logs.model");
    return {
      item_logs: {
        relation: Model.HasManyRelation,
        modelClass: Item_inventario_log,
        join: {
          from: `${tableNames.item_inventario}.id`,
          to: `${tableNames.item_inventario_log}.${tableNames.item_inventario}_id`,
        },
      },
      /*     precio_logs: {
        relation: Model.HasManyRelation,
        modelClass: Precio_log,
        join: {
          from: `${tableNames.item_inventario}.id`,
          to: `${tableNames.precio_log}.${tableNames.item_inventario}_id`,
        },
      } */
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item_inventario}.${tableNames.item}_id`,
          to: `${tableNames.item}.id`,
        },
      },
      lugares: {
        relation: Model.BelongsToOneRelation,
        modelClass: Lugar,
        join: {
          from: `${tableNames.item_inventario}.${tableNames.lugar}_id`,
          to: `${tableNames.lugar}.id`,
        },
      },
      precio: {
        relation: Model.BelongsToOneRelation,
        modelClass: Precio,
        join: {
          from: `${tableNames.item_inventario}.${tableNames.precio}_id`,
          to: `${tableNames.precio}.id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "id",
          "item_id",
          "qty",
          "lugar_id",
          "basura",
          "color",
          "precio_id",
          "sku"
        );
      },
    };
  }
}

module.exports = Item_inventario;
