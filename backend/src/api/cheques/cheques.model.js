const { Model } = require('objection');
const { tableNames } = require('../../constants/string');
const Nota_credito = require('../recibos/nota_creditos/nota_creditos.model');

class Cheque extends Model {
    static get tableName() {
        return tableNames.cheque;
    }

    static get relationMappings() {
        const Pago = require('../noRoute/pago.model');
        return {
            pagos: {
                relation: Model.HasManyRelation,
                modelClass: Pago,
                join: {
                    from: `${tableNames.cheque}.id`,
                    to: `${tableNames.pago}.${tableNames.cheque}_id`
                }
            },
        }
    }
}

module.exports = Cheque;