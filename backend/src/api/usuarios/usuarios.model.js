const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");
const Venta = require("../recibos/ventas/ventas.model");
const Rol = require("./roles/roles.model");

class Usuario extends BaseModel {
  static get tableName() {
    return tableNames.usuario;
  }

  static get relationMappings() {
    const Empresa_owner = require("../empresa_owner/empresa_owner.model");
    return {
      empresa: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Empresa_owner,
        join: {
          from: `${tableNames.usuario}.empresa_owner_id`,
          to: `${tableNames.empresa_owner}.id`,
        },
      },
      venta: {
        relation: BaseModel.HasManyRelation,
        modelClass: Venta,
        join: {
          from: `${tableNames.usuario}.id`,
          to: `${tableNames.venta}.${tableNames.usuario}_id`,
        },
      },
      rol: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Rol,
        join: {
          from: `${tableNames.usuario}.rol_id`,
          to: `${tableNames.rol}.id`,
        },
      },
    };
  }

  static get modifiers() {
    return {
      noPassword(builder) {
        builder.select("id", "nombre");
      },
    };
  }
}

module.exports = Usuario;
