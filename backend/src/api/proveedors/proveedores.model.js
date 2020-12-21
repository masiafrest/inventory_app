const BaseModel = require("../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../constants/string");

class Proveedor extends BaseModel {
  static get tableName() {
    return tableNames.proveedor;
  }
  static get relationMappings() {
    const Inventario_log = require("../items/inventarios/logs/inventario_logs.model");
    const Precio = require("../precio/precios.model");
    return {
      item_logs: {
        relation: Model.HasManyRelation,
        modelClass: Inventario_log,
        join: {
          from: `${tableNames.proveedor}.id`,
          to: `${tableNames.inventario_log}.proveedor_id`,
        },
      },
      precios: {
        relation: Model.HasManyRelation,
        modelClass: Precio,
        join: {
          from: `${tableNames.proveedor}.id`,
          to: `${tableNames.precio}.proveedor_id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "id",
          "nombre",
          "email",
          "website_url",
          "logo_url",
          "pais",
          "direccion",
          "telefono",
          "telefono_2"
        );
      },
    };
  }
}

module.exports = Proveedor;
