const { Model } = require("objection");
const { tableNames } = require("../../../constants/string");

class Item_inventario_log extends Model {
  static get tableName() {
    return tableNames.item_inventario_log;
  }

  static get relationMappings() {
    const Item_inventario = require("../../items/item_inventarios/item_inventarios.model");
    const Usuario = require("../../usuarios/usuarios.model");
    const Proveedor = require("../../proveedors/proveedores.model");
    return {
      inventario: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item_inventario,
        join: {
          from: `${tableNames.item_inventario_log}.${tableNames.item_inventario}_id`,
          to: `${tableNames.item_inventario}.id`,
        },
      },
      usuario: {
        relation: Model.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.item_inventario_log}.${tableNames.usuario}_id`,
          to: `${tableNames.usuario}.id`,
        },
      },
      proveedor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Proveedor,
        join: {
          from: `${tableNames.item_inventario_log}.${tableNames.proveedor}_id`,
          to: `${tableNames.proveedor}.id`,
        },
      },
    };
  }
}

module.exports = Item_inventario_log;
