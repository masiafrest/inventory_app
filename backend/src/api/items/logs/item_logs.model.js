const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Item_log extends BaseModel {
  static get tableName() {
    return tableNames.item_log;
  }

  static get relationMappings() {
    const Item = require("../items.model");
    const Usuario = require("../../usuarios/usuarios.model");
    const Empresa_cliente = require("../../empresa_clientes/empresa_clientes.model");
    const Proveedor = require("../../proveedors/proveedores.model");
    return {
      cliente: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Empresa_cliente,
        join: {
          from: `${tableNames.item_log}.${tableNames.empresa_cliente}_id`,
          to: `${tableNames.empresa_cliente}.id`,
        },
      },
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.item_log}.${tableNames.item}_id`,
          to: `${tableNames.item}.id`,
        },
      },
      usuario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.item}.${tableNames.usuario}_id`,
          to: `${tableNames.usuario}.id`,
        },
      },
      proveedor: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Proveedor,
        join: {
          from: `${tableNames.item_log}.${tableNames.proveedor}_id`,
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
          "item_id",
          "usuario_id",
          "proveedor_id",
          "evento",
          "ajuste"
        );
      },
    };
  }
}

module.exports = Item_log;
