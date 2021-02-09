const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");

class Empresa_cliente extends BaseModel {
  static get tableName() {
    return tableNames.empresa_cliente;
  }

  static get relationMappings() {
    const Logo = require("../logos.model");
    return {
      logo: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Logo,
        join: {
          from: `${tableNames.empresa_cliente}.logo_id`,
          to: `${tableNames.logos}.${tableNames.empresa_cliente}.id`,
        },
      },
    };
  }

  static get modifiers() {
    return {
      getNameAndId(builder) {
        builder.select("id", "nombre");
      },
    };
  }
}

module.exports = Empresa_cliente;
