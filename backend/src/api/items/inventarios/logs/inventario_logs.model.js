const BaseModel = require("../../../BaseModel");
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
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.inventario_log}.${tableNames.inventario}_id`,
          to: `${tableNames.inventario}.id`,
        },
      },
      usuario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.inventario_log}.${tableNames.usuario}_id`,
          to: `${tableNames.usuario}.id`,
        },
      },
      proveedor: {
        relation: BaseModel.BelongsToOneRelation,
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
    switch (evento) {
      case "modificar":
        console.log("ACABARON DE MODIFICAR ITEM", inventario_id);
        console.log("ajuste - qty : ", ajuste, inventarioDB.qty);
        const result = ajuste - inventarioDB.qty;
        inputItems[0].ajuste = result;
        break;
    }
    if (inventarioDB) {
      const { created_at, updated_at } = inventarioDB;
      if (created_at < updated_at) {
        /*         inputItems[0].precio_viejo = precio;
        inputItems[0].precio_min_viejo = precio_min;
        inputItems[0].costo_viejo = costo */
      }
    }
  }
  static async beforeUpdate({ inputItems }) {
    console.log("INVENTARIO LOG before Update😛");
    console.log("inputItems:", inputItems);
    let { inventario_id, ajuste, evento } = inputItems[0];
    const inventarioDB = await Inventario.query().findById(inventario_id);
    switch (evento) {
      case "modificar":
        console.log("ACABARON DE MODIFICAR ITEM", inventario_id);
        console.log("ajuste - qty : ", ajuste, inventarioDB.qty);
        const result = ajuste - inventarioDB.qty;
        inputItems[0].ajuste = result;
        break;
    }
  }
}

module.exports = Inventario_log;
