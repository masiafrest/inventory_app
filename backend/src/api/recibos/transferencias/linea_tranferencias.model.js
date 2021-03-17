const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Linea_tranferencia extends BaseModel {
  static get tableName() {
    return tableNames.linea_transferencia;
  }

  static get relationMappings() {
    const Transferencia = require("./transferencias.model");
    const Lugar = require("../../lugares/lugares.model");
    const Item = require("../../items/items.model");
    return {
      cotizacion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Transferencia,
        join: {
          from: `${tableNames.transferencia}.id`,
          to: `${tableNames.linea_transferencia}.${tableNames.transferencia}_id`,
        },
      },
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.linea_transferencia}.${tableNames.item}_id`,
        },
      },
      origen: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Lugar,
        join: {
          from: `${tableNames.lugar}.id`,
          to: `${tableNames.linea_transferencia}.origen_${tableNames.lugar}_id`,
        },
      },

      destino: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Lugar,
        join: {
          from: `${tableNames.lugar}.id`,
          to: `${tableNames.linea_transferencia}.destino_${tableNames.lugar}_id`,
        },
      },
    };
  }
}

module.exports = Linea_tranferencia;
