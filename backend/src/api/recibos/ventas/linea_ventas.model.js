const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Linea_venta extends BaseModel {
  static get tableName() {
    return tableNames.linea_venta;
  }

  static get relationMappings() {
    const Venta = require("./ventas.model");
    const Item = require("../../items/items.model");
    return {
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.linea_venta}.${tableNames.item}_id`,
        },
      },
      venta: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Venta,
        join: {
          from: `${tableNames.venta}.id`,
          to: `${tableNames.linea_venta}.${tableNames.venta}_id`,
        },
      },
    };
  }

  static afterInsert({ items, inputItems, relation }) {
    const Item = require("../../items/items.model");
    console.log("LineasVentas..........................");
    console.log("items:     ", items);
    console.log("inputItems:", inputItems);
    // inputItems: [
    //   Linea_venta {
    //     item_id: 4,
    //     qty: '1',
    //     precio: 12,
    //     venta_id: 18,
    //     created_at: '2021-03-28T19:37:51.954Z',
    //     id: 6
    //   },
    //   Linea_venta {
    //     item_id: 1,
    //     qty: '1',
    //     precio: 10.99,
    //     venta_id: 18,
    //     created_at: '2021-03-28T19:37:51.954Z',
    //     id: 7
    //   }
    // ]
    console.log("relation:  ", relation ? relation.name : "none");
  }
}

module.exports = Linea_venta;
