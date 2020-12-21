const BaseModel = require("../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../constants/string");
//TODO resolver si tneer venta y cotizaciones por separado
class Linea_tranferencia extends BaseModel {
  static get tableName() {
    return tableNames.linea_transferencia;
  }

  static get relationMappings() {
    const Transferencia = require("./transferencias/transferencias.model");
    const Inventario = require("../items/inventarios/inventarios.model");
    return {
      cotizacion: {
        relation: Model.BelongsToOneRelation,
        modelClass: Transferencia,
        join: {
          from: `${tableNames.transferencia}.id`,
          to: `${tableNames.linea_transferencia}.${tableNames.transferencia}_id`,
        },
      },
      inventario: {
        relation: Model.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.inventario}.id`,
          to: `${tableNames.transferencia}.${tableNames.inventario}_id`,
        },
      },
    };
  }
}

module.exports = Linea_tranferencia;
