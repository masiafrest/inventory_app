const { Model } = require("objection");

const { tableNames } = require("../../constants/string");

class Usuario extends Model {
  static get tableName() {
    return tableNames.usuario;
  }

  static get relationMappings() {
    const Empresa_owner = require("../empresa_owner/empresa_owner.model");
    const Recibo_encabezado = require("../noRoute/recibo_encabezados.model");
    return {
      empresa: {
        relation: Model.BelongsToOneRelation,
        modelClass: Empresa_owner,
        join: {
          from: `${tableNames.usuario}.empresa_owner_id`,
          to: `${tableNames.empresa_owner}.id`,
        },
      },
      recibos: {
        relation: Model.HasManyRelation,
        modelClass: Recibo_encabezado,
        join: {
          from: `${tableNames.usuario}.id`,
          to: `${tableNames.recibo_encabezado}.empleado.id`,
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
