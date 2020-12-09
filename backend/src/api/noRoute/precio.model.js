const { Model } = require('objection');
const { tableNames } = require('../../constants/string');

class Precio extends Model {
    static get tableName() {
        return tableNames.precio;
    }

    static get relationMappings() {
        const Proveedor = require('../proveedors/proveedores.model');
        const Usuario = require('../usuarios/usuarios.model');
        const Empresa_cliente = require('../empresa_clientes/empresa_clientes.model');

        return {
            proveedor: {
                relation: Model.BelongsToOneRelation,
                modelClass: Proveedor,
                join: {
                    from: `${tableNames.precio}.proveedor_id`,
                    to: `${tableNames.proveedor}.id`
                }
            },
            items: {
                relation: Model.HasManyRelation,
                modelClass: Item,
                join: {
                    from: `${tableNames.precio}.id`,
                    to: `${tableNames.item}.${tableNames.precio}_id`
                }
            },
            precio_logs: {
                relation: Model.HasManyRelation,
                modelClass: Precio_log,
                join: {
                    from: `${tableNames.precio}.id`,
                    to: `${tableNames.precio_log}.${tableNames.precio}_id`
                }
            },
        }
    }
}

module.exports = Precio;