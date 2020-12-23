const BaseModel = require("../BaseModel");
const { Model } = require("objection");

const { tableNames } = require("../../constants/string");
const Venta = require("../recibos/ventas/ventas.model");

class Usuario extends BaseModel {
  static get tableName() {
    return tableNames.usuario;
  }

  static get relationMappings() {
    const Empresa_owner = require("../empresa_owner/empresa_owner.model");
    return {
      empresa: {
        relation: Model.BelongsToOneRelation,
        modelClass: Empresa_owner,
        join: {
          from: `${tableNames.usuario}.empresa_owner_id`,
          to: `${tableNames.empresa_owner}.id`,
        },
      },
      venta: {
        relation: Model.HasManyRelation,
        modelClass: Venta,
        join: {
          from: `${tableNames.usuario}.id`,
          to: `${tableNames.venta}.${tableNames.usuario}_id`,
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
