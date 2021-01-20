const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Nota_credito extends BaseModel {
  static get tableName() {
    return tableNames.nota_credito;
  }

  static get relationMappings() {
    const Empresa_cliente = require("../../empresa_clientes/empresa_clientes.model");
    const Usuario = require("../../usuarios/usuarios.model");
    const Linea_nota_credito = require("./linea_nota_creditos.model");
    const Pago = require("../../noRoute/pagos.model");
    return {
      cliente: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Empresa_cliente,
        join: {
          from: `${tableNames.nota_credito}.empresa_cliente_id`,
          to: `${tableNames.empresa_cliente}.id`,
        },
      },
      usuario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.nota_credito}.usuario_id`,
          to: `${tableNames.usuario}.id`,
        },
      },
      lineas: {
        relation: BaseModel.HasManyRelation,
        modelClass: Linea_nota_credito,
        join: {
          from: `${tableNames.nota_credito}.id`,
          to: `${tableNames.linea_nota_credito}.${tableNames.nota_credito}_id`,
        },
      },
      pago: {
        relation: BaseModel.HasManyRelation,
        modelClass: Pago,
        join: {
          from: `${tableNames.nota_credito}.id`,
          to: `${tableNames.pago}.${tableNames.nota_credito}_id`,
        },
      },
      pago2: {
        relation: BaseModel.HasManyRelation,
        modelClass: Pago,
        join: {
          from: `${tableNames.nota_credito}.id`,
          to: `${tableNames.pago}.${tableNames.nota_credito}_2_id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "total", "created_at");
      },
    };
  }
}

module.exports = Nota_credito;
