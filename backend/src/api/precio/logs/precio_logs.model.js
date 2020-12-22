const BaseModel = require("../../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../../constants/string");
const Precio = require("../precios.model");

class Precio_log extends BaseModel {
  static get tableName() {
    return tableNames.precio_log;
  }

  static get relationMappings() {
    const Usuario = require("../../usuarios/usuarios.model");
    const Inventario = require("../../items/inventarios/inventarios.model");
    const Proveedor = require("../../proveedors/proveedores.model");

    return {
      items: {
        relation: Model.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.precio_log}.${tableNames.inventario}_id`,
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
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "id",
          "inventario_id",
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
    console.log("PRECIO_LOG before insert 😛");
    console.log("items:     ", items);
    console.log("inputItems:", inputItems);
    const { precio_id } = inputItems[0];
    //inputItems[0].precio_viejo = 1000;
    const precioDB = await Precio.query().findById(precio_id);
    console.log("precioDB: ", precioDB);
    if (precioDB) {
      const {
        precio,
        oferta,
        oferta_precio,
        costo,
        precio_min,
        proveedor_id,
        created_at,
        updated_at,
      } = precioDB;
      if (created_at < updated_at) {
        inputItems[0].precio_viejo = precio;
        inputItems[0].precio_min_viejo = precio_min;
        inputItems[0].costo_viejo = costo;
      }
    }
  }
}

module.exports = Precio_log;
