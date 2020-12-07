const { Model } = require('objection');
const { tableNames } = require('../../constants/string');

console.log('empresa_owner.model.js')
class Empresa_owner extends Model {
    static get tableName() {
        return tableNames.empresa_owner;
    }

    static get relationMappings() {
        const Usuario = require('../usuarios/usuarios.model')
        return {
            usuarios: {
                relation: Model.HasManyRelation,
                modelClass: Usuario,
                join: {
                    from: 'empresa_owner.id',
                    to: 'usuario.empresa_owner_id'
                }
            }
        }
    }
}

module.exports = Empresa_owner;