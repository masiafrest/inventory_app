const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");

class Cheque extends BaseModel {
  static get tableName() {
    return tableNames.cheque;
  }

  static get relationMappings() {
    const Pago = require("../noRoute/pagos.model");
    return {
      pagos: {
        relation: BaseModel.HasManyRelation,
        modelClass: Pago,
        join: {
          from: `${tableNames.cheque}.id`,
          to: `${tableNames.pago}.${tableNames.cheque}_id`,
        },
      },
    };
  }
}

module.exports = Cheque;
