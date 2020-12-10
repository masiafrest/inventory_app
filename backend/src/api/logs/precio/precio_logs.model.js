
const { Model } = require('objection');
const { tableNames } = require('../../../constants/string');

class Precio_log extends Model {
    static get tableName() {
        return tableNames.precio_log;
    }

    static get relationMappings() {
        const Item = require('../../items/items.model');
        const Usuario = require('../../usuarios/usuarios.model');

        return {
            items: {
                relation: Model.BelongsToOneRelation,
                modelClass: Item,
                join: {
                    from: `${tableNames.item}.id`,
                    to: `${tableNames.precio_log}.${tableNames.item}_id`
                }
            },
            usuarios: {
                relation: Model.BelongsToOneRelation,
                modelClass: Usuario,
                join: {
                    from: `${tableNames.usuario}.id`,
                    to: `${tableNames.precio_log}.${tableNames.usuario}id`
                }
            },
        }
    }
}

module.exports = Precio_log;