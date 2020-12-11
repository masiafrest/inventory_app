const { Model } = require('objection');
const { tableNames } = require('../../../constants/string');

class Nota_credito extends Model {
    static get tableName() {
        return tableNames.nota_credito;
    }

    static get relationMappings() {
        const Recibo_encabezado = require('../../noRoute/recibo_encabezado.model');
        const Linea_nota_credito = require('../linea_nota_creditos.model');
        return {
            encabezado: {
                relation: Model.BelongsToOneRelation,
                modelClass: Recibo_encabezado,
                join: {
                    from: `${tableNames.nota_credito}.${tableNames.recibo_encabezado}_id`,
                    to: `${tableNames.recibo_encabezado}.id`
                }
            },
            lineas: {
                relation: Model.HasManyRelation,
                modelClass: Linea_nota_credito,
                join: {
                    from: `${tableNames.nota_credito}.id`,
                    to: `${tableNames.linea_nota_credito}.${tableNames.nota_credito}_id`
                }
            },
        }
    }
}

module.exports = Nota_credito;