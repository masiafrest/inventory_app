const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Precio_log extends BaseModel {
  static get tableName() {
    return tableNames.precio_log;
  }

  static get relationMappings() {
    const Usuario = require("../../usuarios/usuarios.model");
    const Item = require("../../items/items.model");
    const Proveedor = require("../../proveedors/proveedores.model");

    return {
      items: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.precio_log}.${tableNames.item}_id`,
        },
      },
      usuarios: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.usuario}.id`,
          to: `${tableNames.precio_log}.${tableNames.usuario}_id`,
        },
      },
      proveedor: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Proveedor,
        join: {
          from: `${tableNames.proveedor}.id`,
          to: `${tableNames.precio_log}.${tableNames.proveedor}_id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "id",
          "item_id",
          "usuario_id",
          "proveedor_id",
          "precio_viejo",
          "costo_viejo",
          "precio_min_viejo"
        );
      },
    };
  }
  static async beforeInsert({ items, inputItems, asFindQuery }) {
    const Precio = require("../precios.model");
    console.log("PRECIO_LOG before insert 😛");
    console.log("inputItems:", inputItems);
    const { precio_id } = inputItems[0];
    const precioDB = await Precio.query().findById(precio_id);
    console.log("precioDB: ", precioDB);
    if (precioDB) {
      const { precio, costo, precio_min, created_at, updated_at } = precioDB;
      if (created_at <= updated_at) {
        inputItems[0].precio_viejo = precio;
        inputItems[0].precio_min_viejo = precio_min;
        inputItems[0].costo_viejo = costo;
      }
    }
  }
}

module.exports = Precio_log;
