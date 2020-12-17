const { Model } = require("objection");
const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");

class Item extends BaseModel {
  static get tableName() {
    return tableNames.item;
  }

  static get relationMappings() {
    const Item_inventario = require("../items/item_inventarios/item_inventarios.model");
    const Categoria = require("../categorias/categorias.model");
    return {
      inventarios: {
        relation: Model.HasManyRelation,
        modelClass: Item_inventario,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.item_inventario}.${tableNames.item}_id`,
        },
      },
      categoria: {
        relation: Model.BelongsToOneRelation,
        modelClass: Categoria,
        join: {
          from: `${tableNames.item}.${tableNames.categoria}_id`,
          to: `${tableNames.categoria}.id`,
        },
      },
      categoria2: {
        relation: Model.BelongsToOneRelation,
        modelClass: Categoria,
        join: {
          from: `${tableNames.item}.${tableNames.categoria}_2_id`,
          to: `${tableNames.categoria}.id`,
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
          "descripcion",
          "modelo",
          "barcode",
          "image_url",
          "categoria_id",
          "categoria_2_id"
        );
      },
    };
  }
}

module.exports = Item;
