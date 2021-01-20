const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Linea_tranferencia extends BaseModel {
  static get tableName() {
    return tableNames.linea_transferencia;
  }

  static get relationMappings() {
    const Transferencia = require("./transferencias.model");
    const Inventario = require("../../items/inventarios/inventarios.model");
    return {
      cotizacion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Transferencia,
        join: {
          from: `${tableNames.transferencia}.id`,
          to: `${tableNames.linea_transferencia}.${tableNames.transferencia}_id`,
        },
      },
      inventario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.inventario}.id`,
          to: `${tableNames.linea_transferencia}.${tableNames.inventario}_id`,
        },
      },
    };
  }
}

module.exports = Linea_tranferencia;
