const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");

class Empresa_owner extends BaseModel {
  static get tableName() {
    return tableNames.empresa_owner;
  }

  static get relationMappings() {
    const Usuario = require("../usuarios/usuarios.model");
    return {
      usuarios: {
        relation: BaseModel.HasManyRelation,
        modelClass: Usuario,
        join: {
          from: "empresa_owner.id",
          to: "usuario.empresa_owner_id",
        },
      },
    };
  }
}

module.exports = Empresa_owner;
