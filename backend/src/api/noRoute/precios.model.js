const { Model } = require("objection");
const { tableNames } = require("../../constants/string");

class Precio extends Model {
  static get tableName() {
    return tableNames.precio;
  }

  static get relationMappings() {
    const Proveedor = require("../proveedors/proveedores.model");
    const Item = require("../items/items.model");
    return {
      proveedor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Proveedor,
        join: {
          from: `${tableNames.precio}.proveedor_id`,
          to: `${tableNames.proveedor}.id`,
        },
      },
      items: {
        relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.precio}.id`,
          to: `${tableNames.item}.${tableNames.precio}_id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "id",
          "precio",
          "oferta",
          "oferta_precio",
          "costo",
          "precio_min",
          "proveedor_id"
        );
      },
    };
  }
}

module.exports = Precio;
