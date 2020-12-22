const BaseModel = require("../BaseModel");
const { Model } = require("objection");
const { tableNames } = require("../../constants/string");

class Precio extends BaseModel {
  static get tableName() {
    return tableNames.precio;
  }

  static get relationMappings() {
    const Proveedor = require("../proveedors/proveedores.model");
    const Item = require("../items/items.model");
    const Precio_log = require("./logs/precio_logs.model");
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
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Precio_log,
        join: {
          from: `${tableNames.precio}.id`,
          to: `${tableNames.precio_log}.${tableNames.precio}_id`,
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

  static beforeUpdate({ items, inputItems, relation, asFindQuery }) {
    console.log("PRECIO before Update 😎");
    console.log("inputItems:", inputItems);
    inputItems[0].updated_at = new Date().toISOString();
  }
}

module.exports = Precio;
