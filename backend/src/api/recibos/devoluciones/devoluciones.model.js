const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Devolucion extends BaseModel {
  static get tableName() {
    return tableNames.devolucion;
  }

  static get relationMappings() {
    const Linea_devolucion = require("./linea_devoluciones.model");
    return {
      lineas: {
        relation: BaseModel.HasManyRelation,
        modelClass: Linea_devolucion,
        join: {
          from: `${tableNames.devolucion}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.devolucion}_id`,
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

module.exports = Devolucion;
