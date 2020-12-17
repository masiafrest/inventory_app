const BaseModel = require("../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../constants/string");

class Pago extends BaseModel {
  static get tableName() {
    return tableNames.pago;
  }

  static get relationMappings() {
    const Nota_credito = require("../recibos/nota_creditos/nota_creditos.model");
    const Venta = require("../recibos/ventas/ventas.model");
    const Cheque = require("../cheques/cheques.model");
    return {
      nota_creditos: {
        relation: Model.BelongsToOneRelation,
        modelClass: Nota_credito,
        join: {
          from: `${tableNames.pago}.${tableNames.nota_credito}_id`,
          to: `${tableNames.nota_creditos}.id`,
        },
      },
      nota_creditos2: {
        relation: Model.BelongsToOneRelation,
        modelClass: Nota_credito,
        join: {
          from: `${tableNames.pago}.${tableNames.nota_credito}_2_id`,
          to: `${tableNames.nota_creditos}.id`,
        },
      },
      cheques: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cheque,
        join: {
          from: `${tableNames.pago}.${tableNames.cheque}_id`,
          to: `${tableNames.cheque}.id`,
        },
      },
      venta: {
        relation: Model.HasManyRelation,
        modelClass: Venta,
        join: {
          from: `${tableNames.pago}.id`,
          to: `${tableNames.venta}.${tableNames.pago}_id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "id",
          "nequi",
          "transferencia",
          "efectivo",
          "yappi",
          "nota_credito_id",
          "nota_creditos_2_id"
        );
      },
    };
  }
}

module.exports = Pago;
