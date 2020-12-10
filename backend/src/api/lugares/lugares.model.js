
const { Model } = require('objection');
const { tableNames } = require('../../constants/string');
const Item_inventario = require('../items/item_inventarios/item_inventarios.model');

class Lugar extends Model {
    static get tableName() {
        return tableNames.lugar;
    }

    static get relationMappings() {
        return {
            inventarios: {
                relation: Model.HasManyRelation,
                modelClass: Item_inventario,
                join: {
                    from: `${tableNames.lugar}.id`,
                    to: `${tableNames.item_inventario}.${tableNames.lugar}_id`
                }
            },
        }
    }
}

module.exports = Lugar;