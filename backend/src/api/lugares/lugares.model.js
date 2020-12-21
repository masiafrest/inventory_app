const BaseModel = require("../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../constants/string");

class Lugar extends BaseModel {
  static get tableName() {
    return tableNames.lugar;
  }

  static get relationMappings() {
    const Inventario = require("../items/inventarios/inventarios.model");
    return {
      inventarios: {
        relation: Model.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.inventario}.${tableNames.lugar}_id`,
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
