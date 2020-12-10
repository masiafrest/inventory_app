const { Model } = require('objection');
const { tableNames } = require('../../constants/string');

class Item_inventario extends Model {
    static get tableName() {
        return tableNames.item;
    }

    static get relationMappings() {
        const Item = require('../items.model');
        const Lugar = require('../../lugares/lugares.model');
        return {
            inventario: {
                relation: Model.BelongsToOneRelation,
                modelClass: Item,
                join: {
                    from: `${tableNames.item_inventario}.${tableNames.item}_id`,
                    to: `${tableNames.item}.id`
                }
            },
            lugares: {
                relation: Model.BelongsToOneRelation,
                modelClass: Lugar,
                join: {
                    from: `${tableNames.item_inventario}.${tableNames.lugar}_id`,
                    to: `${tableNames.lugar}.id`
                }
            },
        }
    }
}

module.exports = Item_inventario;