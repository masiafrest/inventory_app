const BaseModel = require("../../BaseModel");
const { Model } = require("objection");

const { tableNames } = require("../../../constants/string");

class Garantia extends BaseModel {
  static get tableName() {
    return tableNames.garantia;
  }

  static get relationMappings() {
    const Linea_garantia = require("../linea_garantias.model");
    return {
      lineas: {
        relation: Model.HasManyRelation,
        modelClass: Linea_garantia,
        join: {
          from: `${tableNames.garantia}.id`,
          to: `${tableNames.linea_garantia}.${tableNames.garantia}_id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "total", "created_at");
      },
    };
  }
}

module.exports = Garantia;
