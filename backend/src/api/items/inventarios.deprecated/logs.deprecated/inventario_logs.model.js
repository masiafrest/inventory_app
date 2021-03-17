const BaseModel = require("../../../BaseModel");
const { tableNames } = require("../../../../constants/string");

class Inventario_log extends BaseModel {
  static get tableName() {
    return tableNames.inventario_log;
  }

  static get relationMappings() {
    const Inventario = require("../inventarios.model");
    const Usuario = require("../../../usuarios/usuarios.model");
    const Empresa_cliente = require("../../../empresa_clientes/empresa_clientes.model");
    const Proveedor = require("../../../proveedors/proveedores.model");
    return {
      cliente: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Empresa_cliente,
        join: {
          from: `${tableNames.inventario_log}.${tableNames.empresa_cliente}_id`,
          to: `${tableNames.empresa_cliente}.id`,
        },
      },
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
}

module.exports = Inventario_log;
