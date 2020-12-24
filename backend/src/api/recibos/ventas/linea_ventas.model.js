const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");
const Inventario = require("../../items/inventarios/inventarios.model");
const Inventario_log = require("../../items/inventarios/logs/inventario_logs.model");

class Linea_venta extends BaseModel {
  static get tableName() {
    return tableNames.linea_venta;
  }

  static get relationMappings() {
    const Venta = require("./ventas.model");
    const Inventario = require("../../items/inventarios/inventarios.model");
    return {
      venta: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Venta,
        join: {
          from: `${tableNames.venta}.id`,
          to: `${tableNames.linea_venta}.${tableNames.venta}_id`,
        },
      },
      inventario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.inventario}.id`,
          to: `${tableNames.linea_venta}.${tableNames.inventario}_id`,
        },
      },
    };
  }
}

module.exports = Linea_venta;
