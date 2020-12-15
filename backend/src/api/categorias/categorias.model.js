const { Model } = require("objection");
const { tableNames } = require("../../constants/string");

class Categoria extends Model {
  static get tableName() {
    return tableNames.categoria;
  }

  static get relationMappings() {
    const Item = require("../items/items.model");
    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.categoria}.id`,
          to: `${tableNames.item}.${tableNames.categoria}_id`,
        },
      },
      items2: {
        relation: Model.HasManyRelation,
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
