const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");

class Defectuoso extends BaseModel {
  static get tableName() {
    return tableNames.defectuoso;
  }

  static get relationMappings() {
    const Lugar = require("../lugares/lugares.model");
    const Item = require("../items/items.model");
    return {
      items: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.defectuoso}.${tableNames.item}_id`,
          to: `${tableNames.lugar}.id`,
        },
      },
      lugares: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Lugar,
        join: {
          from: `${tableNames.defectuoso}.${tableNames.lugar}_id`,
          to: `${tableNames.lugar}.id`,
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

module.exports = Defectuoso;
