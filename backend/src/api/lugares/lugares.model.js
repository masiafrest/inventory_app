const BaseModel = require("../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../constants/string");

class Lugar extends BaseModel {
  static get tableName() {
    return tableNames.lugar;
  }

  static get relationMappings() {
    const Item_inventario = require("../items/item_inventarios/item_inventarios.model");
    return {
      inventarios: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item_inventario,
        join: {
          from: `${tableNames.item_inventario}.${tableNames.lugar}_id`,
          to: `${tableNames.lugar}.id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "tipo", "direccion");
      },
    };
  }
}

module.exports = Lugar;
