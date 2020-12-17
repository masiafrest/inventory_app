const BaseModel = require("../../BaseModel");
const { Model } = require("objection");

const { tableNames } = require("../../../constants/string");

class Garantia extends BaseModel {
  static get tableName() {
    return tableNames.garantia;
  }

  static get relationMappings() {
    const Recibo_encabezado = require("../../noRoute/recibo_encabezados.model");
    const Linea_garantia = require("../linea_garantias.model");
    return {
      encabezado: {
        relation: Model.BelongsToOneRelation,
        modelClass: Recibo_encabezado,
        join: {
          from: `${tableNames.garantia}.${tableNames.recibo_encabezado}_id`,
          to: `${tableNames.recibo_encabezado}.id`,
        },
      },
      lineas: {
        relation: Model.HasManyRelation,
        modelClass: Linea_garantia,
        join: {
          from: `${tableNames.garantia}.id`,
          to: `${tableNames.linea_garantia}.${tableNames.garantia}_id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "recibo_encabezado_id", "total", "created_at");
      },
    };
  }
}

module.exports = Garantia;
