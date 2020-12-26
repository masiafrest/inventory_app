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
  }
}

module.exports = Inventario_log;
