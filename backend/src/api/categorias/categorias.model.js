const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");

class Categoria extends BaseModel {
  static get tableName() {
    return tableNames.categoria;
  }

  static get relationMappings() {
    const Item = require("../items/items.model");
    return {
      items: {
        relation: BaseModel.HasManyRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.categoria}.id`,
          to: `${tableNames.item}.${tableNames.categoria}_id`,
        },
      },
      items2: {
        relation: BaseModel.HasManyRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.categoria}.id`,
          to: `${tableNames.item}.${tableNames.categoria}_2_id`,
        },
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "nombre");
      },
    };
  }
}

module.exports = Categoria;
