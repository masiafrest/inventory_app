const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");
const { static } = require("express");

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

  static get modifiers() {
    return {
      getItemData(builder) {
        builder
          .join("inventario", { "linea_venta.inventario_id": "inventario.id" })
          .join("item", { "inventario.item_id": "item.id" })
          .join("precio", { "inventario.precio_id": "precio.id" })
          .select(
            "linea_venta.qty",
            "inventario.sku",
            "item.marca",
            "item.modelo",
            "precio.precio"
          );
      },
    };
  }
}

module.exports = Linea_venta;
