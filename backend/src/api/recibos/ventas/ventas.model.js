const { Model } = require('objection');
const { tableNames } = require('../../../constants/string');

class Cotizacion extends Model {
    static get tableName() {
        return tableNames.venta;
    }

    static get relationMappings() {
        const Recibo_encabezado = require('../../noRoute/recibo_encabezado.model');
        const Linea_venta_cotizacion = require('../lineas/venta_cotizaciones.model');
        return {
            encabezado: {
                relation: Model.BelongsToOneRelation,
                modelClass: Recibo_encabezado,
                join: {
                    from: `${tableNames.venta}.${tableNames.recibo_encabezado}_id`,
                    to: `${tableNames.recibo_encabezado}.id`
                }
            },
            lineas: {
                relation: Model.HasManyRelation,
                modelClass: Linea_venta_cotizacion,
                join: {
                    from: `${tableNames.venta}.id`,
                    to: `${tableNames.linea_venta_cotizacion}.${tableNames.venta}_id`
                }
            },
        }
    }
}

module.exports = Cotizacion;