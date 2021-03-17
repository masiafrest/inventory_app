const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");

class Lugar extends BaseModel {
  static get tableName() {
    return tableNames.lugar;
  }

  static get relationMappings() {
    const Item = require("../items/items.model");
    return {
      items: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.${tableNames.lugar}_id`,
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
