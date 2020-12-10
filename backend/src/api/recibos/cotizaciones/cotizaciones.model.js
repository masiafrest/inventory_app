const { Model } = require('objection');
const { tableNames } = require('../../../constants/string');

class Cotizacion extends Model {
    static get tableName() {
        return tableNames.recibo_encabezado;
    }

    static get relationMappings() {
        const Recibo_encabezado = require('../../noRoute/recibo_encabezado.model');
        const Linea_venta_cotizacion = require('../linea_venta_cotizaciones.model');
        return {
            encabezado: {
                relation: Model.BelongsToOneRelation,
                modelClass: Recibo_encabezado,
                join: {
                    from: `${tableNames.cotizacion}.${tableNames.recibo_encabezado}_id`,
                    to: `${tableNames.recibo_encabezado}.id`
                }
            },
            lineas: {
                relation: Model.HasManyRelation,
                modelClass: Linea_venta_cotizacion,
                join: {
                    from: `${tableNames.cotizacion}.id`,
                    to: `${tableNames.linea_venta_cotizacion}.${tableNames.cotizacion}_id`
                }
            },
        }
    }
}

module.exports = Cotizacion;