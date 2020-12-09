const { Model } = require("objection")

const { Model } = require('objection');
const { tableNames } = require('../constants/string');

class Recibo_encabezado extends Model {
    static get tableName() {
        return tableNames.recibo_encabezado;
    }

    static get relationMappings() {
        const Usuario = require('./usuarios/usuarios.model');
        const Empresa_cliente = require('./empresa_clientes/empresa_clientes.model');

        return {
            vendedores: {
                relation: Model.BelongsToOneRelation,
                modelClass: Usuario,
                join: {
                    from: 'recibo_encabezado.empleado_id',
                    to: 'usuario.id'
                }
            },
            clientes: {
                relation: Model.BelongsToOneRelation,
                modelClass: Empresa_cliente,
                join: {
                    from: 'recibo_encabezado.empresa_cliente_id',
                    to: 'empresa_cliente.id'
                }
            },
            cotizaciones: {
                relation: Model.HasManyRelation,
                modelClass: Cotizacion,
                join: {
                    from: 'recibo_encabezado.id',
                    to: 'cotizacion.recibo_encabezado.id'
                }
            },
            ventas: {
                relation: Model.HasManyRelation,
                modelClass: Venta,
                join: {
                    from: 'recibo_encabezado.id',
                    to: 'venta.recibo_encabezado.id'
                }
            },
            garantias: {
                relation: Model.HasManyRelation,
                modelClass: Garantias,
                join: {
                    from: 'recibo_encabezado.id',
                    to: 'garantia.recibo_encabezado.id'
                }
            },
            nota_creditos: {
                relation: Model.HasManyRelation,
                modelClass: Nota_credito,
                join: {
                    from: 'recibo_encabezado.id',
                    to: 'nota_credito.recibo_encabezado.id'
                }
            },
            devoluciones: {
                relation: Model.HasManyRelation,
                modelClass: Devolucion,
                join: {
                    from: 'recibo_encabezado.id',
                    to: 'devolucion.recibo_encabezado.id'
                }
            },
        }
    }
}

module.exports = Recibo_encabezado;