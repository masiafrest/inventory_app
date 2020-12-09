const { Model } = require('objection');
const { tableNames } = require('../../constants/string');

class Proveedor extends Model {
    static get tableName() {
        return tableNames.proveedor;
    }
    static get relationMappings() {
        //TODO add item_ivnetario_log, precio class
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
