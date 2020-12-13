const { Model } = require("objection");
const { tableNames } = require("../../../constants/string");
const Item_inventario = require("../../items/item_inventarios/item_inventarios.model");
const Proveedor = require("../../proveedors/proveedores.model");

class Precio_log extends Model {
  static get tableName() {
    return tableNames.precio_log;
  }

  static get relationMappings() {
    const Usuario = require("../../usuarios/usuarios.model");

    return {
      items: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item_inventario,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.precio_log}.${tableNames.item_inventario}_id`,
        },
      },
      usuarios: {
        relation: Model.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.usuario}.id`,
          to: `${tableNames.precio_log}.${tableNames.usuario}_id`,
        },
      },
      proveedor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Proveedor,
        join: {
          from: `${tableNames.proveedor}.id`,
          to: `${tableNames.precio_log}.${tableNames.proveedor}_id`,
        },
      },
    };
  }
}

module.exports = Precio_log;
