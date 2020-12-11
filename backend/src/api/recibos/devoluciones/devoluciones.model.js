const { Model } = require('objection');
const { tableNames } = require('../../../constants/string');

class Devolucion extends Model {
    static get tableName() {
        return tableNames.devolucion;
    }

    static get relationMappings() {
        const Recibo_encabezado = require('../../noRoute/recibo_encabezado.model');
        const Linea_devolucion = require('../linea_devoluciones.model');
        return {
            encabezado: {
                relation: Model.BelongsToOneRelation,
                modelClass: Recibo_encabezado,
                join: {
                    from: `${tableNames.devolucion}.${tableNames.recibo_encabezado}_id`,
                    to: `${tableNames.recibo_encabezado}.id`
                }
            },
            lineas: {
                relation: Model.HasManyRelation,
                modelClass: Linea_devolucion,
                join: {
                    from: `${tableNames.devolucion}.id`,
                    to: `${tableNames.linea_devolucion}.${tableNames.devolucion}_id`
                }
            },
        }
    }
}

module.exports = Devolucion;