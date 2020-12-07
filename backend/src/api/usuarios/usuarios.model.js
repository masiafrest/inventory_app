const { Model } = require('objection');

const { tableNames } = require('../../constants/string');
const { tableName } = require('../empresa_owner/empresa_owner.model');

class Usuario extends Model {
    static get tableName() {
        return tableNames.usuario;
    }

    static get relationMappings() {
        const Empresa_owner = require('../empresa_owner/empresa_owner.model');
        return {
            usuarios: {
                relation: Model.BelongsToOneRelation,
                modelClass: Empresa_owner,
                join: {
                    from: `${tableNames.usuario}.empresa_owner_id`,
                    to: `${tableNames.empresa_owner}.id`
                }
            }
        }
    }
}

module.exports = Usuario;