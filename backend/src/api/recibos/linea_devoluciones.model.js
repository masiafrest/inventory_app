const { Model } = require('objection');
const { tableNames } = require('../../constants/string');

class Linea_devolucion extends Model {
    static get tableName() {
        return tableNames.linea_devolucion;
    }

    static get relationMappings() {
        const Garantia = require('./garantias/garantias.model');
        const Devolucion = require('./devoluciones/devoluciones.model');
        const Item = require('../items/items.model')
        return {
            garantia: {
                relation: Model.BelongsToOneRelation,
                modelClass: Garantia,
                join: {
                    from: `${tableNames.garantia}.id`,
                    to: `${tableNames.linea_devolucion}.${tableNames.garantia}_id`,
                }
            },
            devolucion: {
                relation: Model.BelongsToOneRelation,
                modelClass: Devolucion,
                join: {
                    from: `${tableNames.devolucion}.id`,
                    to: `${tableNames.linea_devolucion}.${tableNames.devolucion}_id`,
                }
            },
            item_entrada: {
                relation: Model.BelongsToOneRelation,
                modelClass: Item,
                join: {
                    from: `${tableNames.item}.id`,
                    to: `${tableNames.linea_devolucion}.${tableNames.item}_entrada_id`,
                }
            },
            item_salida: {
                relation: Model.BelongsToOneRelation,
                modelClass: Item,
                join: {
                    from: `${tableNames.item}.id`,
                    to: `${tableNames.linea_devolucion}.${tableNames.item}_salida_id`,
                }
            },
        }
    }
}

module.exports = Linea_devolucion;