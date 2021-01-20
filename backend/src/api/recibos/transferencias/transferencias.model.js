const { tableNames } = require("../../../constants/string");
const BaseModel = require("../../BaseModel");

class Transferencia extends BaseModel {
  static get tableName() {
    return tableNames.transferencia;
  }

  static get relationMappings() {
    const Empresa_cliente = require("../../empresa_clientes/empresa_clientes.model");
    const Usuario = require("../../usuarios/usuarios.model");
    const Linea_tranferencia = require("./linea_tranferencias.model");
    return {
      usuario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: `${tableNames.transferencia}.usuario_id`,
          to: `${tableNames.usuario}.id`,
        },
      },
      lineas: {
        relation: BaseModel.HasManyRelation,
        modelClass: Linea_tranferencia,
        join: {
          from: `${tableNames.transferencia}.id`,
          to: `${tableNames.linea_transferencia}.${tableNames.transferencia}_id`,
        },
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "id",
          "total",
          "sub_total",
          "tax",
          "pagado",
          "entregado",
          "pago_id",
          "created_at"
        );
      },
    };
  }
}

module.exports = Transferencia;
