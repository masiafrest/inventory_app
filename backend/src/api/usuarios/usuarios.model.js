const { Model } = require('objection');

const { tableNames } = require('../../constants/string');

class Usuario extends Model {
    static get tableName() {
        return tableNames.usuario;
    }

    static get relationMappings() {
        const Empresa_owner = require('../empresa_owner/empresa_owner.model');
        return {
            empresas: {
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