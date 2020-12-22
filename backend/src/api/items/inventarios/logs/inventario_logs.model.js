const BaseModel = require("../../../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../../../constants/string");
const Inventario = require("../inventarios.model");

class Inventario_log extends BaseModel {
  static get tableName() {
    return tableNames.inventario_log;
  }

  static get relationMappings() {
    const Inventario = require("../inventarios.model");
    const Usuario = require("../../../usuarios/usuarios.model");
    const Proveedor = require("../../../proveedors/proveedores.model");
    return {
      inventario: {
        relation: Model.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.inventario_log}.${tableNames.inventario}_id`,
          to: `${tableNames.inventario}.id`,
        },
      },
      usuario: {
        relation: Model.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.inventario_log}.${tableNames.usuario}_id`,
          to: `${tableNames.usuario}.id`,
        },
      },
      proveedor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Proveedor,
        join: {
          from: `${tableNames.inventario_log}.${tableNames.proveedor}_id`,
          to: `${tableNames.proveedor}.id`,
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
          "evento",
          "ajuste"
        );
      },
    };
  }
  static async beforeInsert({ items, inputItems, asFindQuery }) {
    console.log("INVENTARIO LOG before insert 😛");
    console.log("inputItems:", inputItems);
    let { inventario_id, ajuste, evento } = inputItems[0];
    const inventarioDB = await Inventario.query().findById(inventario_id);
    //TODO fix ajuste de como debe ser el input, por tema de linea ventas y modificar item
    switch (evento) {
      case "crear":
        console.log("ACABARON DE CREAR ITEM", inventario_id);
        break;
      case "modificar":
        console.log("ACABARON DE MODIFICAR ITEM", inventario_id);
        console.log("ajuste - qty : ", ajuste, inventarioDB.qty);
        const result = ajuste - inventarioDB.qty;
        inputItems[0].ajuste = result;
        break;
      case "venta":
        // qty se debe de restar y aparece ajuste como qty negativo
        console.log("ACABARON DE VENDER ITEM", inventario_id);
        result = ajuste - inventarioDB.qty;
        inputItems[0].ajuste = result;
        break;
    }
    console.log("inventarioDB: ", inventarioDB);
    if (inventarioDB) {
      const { created_at, updated_at } = inventarioDB;
      if (created_at < updated_at) {
        /*         inputItems[0].precio_viejo = precio;
        inputItems[0].precio_min_viejo = precio_min;
        inputItems[0].costo_viejo = costo */
      }
    }
  }
}

module.exports = Inventario_log;
