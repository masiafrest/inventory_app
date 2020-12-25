const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Rol extends BaseModel {
  static get tableName() {
    return tableNames.rol;
  }

  static get relationMappings() {
    const Usuario = require("../usuarios.model");
    return {
      usuario: {
        relation: BaseModel.HasManyRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.rol}.id`,
          to: `${tableNames.usuario}.${tableNames.rol}_id`,
        },
      },
    };
  }
}

module.exports = Rol;
