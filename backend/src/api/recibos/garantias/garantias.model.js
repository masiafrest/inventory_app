const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Garantia extends BaseModel {
  static get tableName() {
    return tableNames.garantia;
  }

  static get relationMappings() {
    const linea_garantia = require("./linea_garantias.model");
    return {
      lineas: {
        relation: BaseModel.HasManyRelation,
        modelClass: linea_garantia,
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
