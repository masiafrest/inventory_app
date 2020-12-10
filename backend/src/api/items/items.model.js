const { Model } = require('objection');
const { tableNames } = require('../../constants/string');

class Item extends Model {
    static get tableName() {
        return tableNames.item;
    }

    static get relationMappings() {
        const Precio = require('../noRoute/precio.model');
        return {
            precio: {
                relation: Model.BelongsToOneRelation,
                modelClass: Precio,
                join: {
                    from: `${tableNames.item}.${tableNames.precio}_id`,
                    to: `${tableNames.precio}.id`
                }
            },
            item_logs: {
                relation: Model.HasManyRelation,
                modelClass: Item_inventario_Log,
                join: {
                    from: `${tableNames.item}.id`,
                    to: `${tableNames.item_inventario_log}.${tableNames.item}_id`
                }
            },
            inventarios: {
                relation: Model.HasManyRelation,
                modelClass: Item_inventario,
                join: {
                    from: `${tableNames.item}.id`,
                    to: `${tableNames.item_inventario}.${tableNames.item}_id`
                }
            },
        }
    }
}

module.exports = Item;