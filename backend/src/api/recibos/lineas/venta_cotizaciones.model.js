const { Model } = require('objection');
const { tableNames } = require('../../../constants/string');

class Linea_venta_cotizacion extends Model {
    static get tableName() {
        return tableNames.linea_venta_cotizacion;
    }

    static get relationMappings() {
        const Cotizacion = require('../../recibos/cotizaciones/cotizaciones.model');
        const Item = require('../../items/items.model');
        const Venta = require('../../recibos/ventas/ventas.model');
        return {
            cotizacion: {
                relation: Model.BelongsToOneRelation,
                modelClass: Cotizacion,
                join: {
                    from: `${tableNames.cotizacion}.id`,
                    to: `${tableNames.linea_venta_cotizacion}.${tableNames.cotizacion}_id`,
                }
            },
            venta: {
                relation: Model.BelongsToOneRelation,
                modelClass: Venta,
                join: {
                    from: `${tableNames.venta}.id`,
                    to: `${tableNames.linea_venta_cotizacion}.${tableNames.venta}_id`,
                }
            },
            item: {
                relation: Model.BelongsToOneRelation,
                modelClass: Item,
                join: {
                    from: `${tableNames.item}.id`,
                    to: `${tableNames.linea_venta_cotizacion}.${tableNames.item}_id`,
                }
            },
        }
    }
}

module.exports = Linea_venta_cotizacion;