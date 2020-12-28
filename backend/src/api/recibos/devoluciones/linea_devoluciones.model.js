const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Linea_devolucion extends BaseModel {
  static get tableName() {
    return tableNames.linea_devolucion;
  }

  static get relationMappings() {
    const Garantia = require("../garantias/garantias.model");
    const Devolucion = require("./devoluciones.model");
    return {
      garantia: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Garantia,
        join: {
          from: `${tableNames.garantia}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.garantia}_id`,
        },
      },
      devolucion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Devolucion,
        join: {
          from: `${tableNames.devolucion}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.devolucion}_id`,
        },
      },
    };
  }
}

module.exports = Linea_devolucion;
