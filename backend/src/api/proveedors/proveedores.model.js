const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");

class Proveedor extends BaseModel {
  static get tableName() {
    return tableNames.proveedor;
  }
  static get relationMappings() {
    const Logo = require("../logos.model");
    const Item_log = require("../items/logs/item_logs.model");
    const Precio = require("../precio/precios.model");
    return {
      logo: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Logo,
        join: {
          from: `${tableNames.proveedor}.logo_id`,
          to: `${tableNames.logos}.${tableNames.proveedor}.id`,
        },
      },
      item_logs: {
        relation: BaseModel.HasManyRelation,
        modelClass: Item_log,
        join: {
          from: `${tableNames.proveedor}.id`,
          to: `${tableNames.item_log}.proveedor_id`,
        },
      },
      precios: {
        relation: BaseModel.HasManyRelation,
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
      getNameAndId(builder) {
        builder.select("id", "nombre");
      },
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
