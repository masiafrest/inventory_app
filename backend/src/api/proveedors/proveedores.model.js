const { Model } = require('objection');
const { tableNames } = require('../../constants/string');

class Proveedor extends Model {
    static get tableName() {
        return tableNames.proveedor;
    }
    static get relationMappings() {
        const Item_inventario_log = require('../logs/item/item_inventario_logs.model')
        const Precio = require('../logs/precio/precio_logs.model');
        return {
            item_logs: {
                relation: Model.HasManyRelation,
                modelClass: Item_inventario_log,
                join: {
                    from: `${tableNames.proveedor}.id`,
                    to: `${tableNames.item_inventario_log}.proveedor_id`
                }
            },
            precios: {
                relation: Model.HasManyRelation,
                modelClass: Precio,
                join: {
                    from: `${tableNames.proveedor}.id`,
                    to: `${tableNames.precio}.proveedor_id`
                }
            },
        }
    }
}

module.exports = Proveedor;
