const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");
const Item_log = require("./logs/item_logs.model");

class Item extends BaseModel {
  static get tableName() {
    return tableNames.item;
  }

  static get relationMappings() {
    const Categoria = require("../categorias/categorias.model");
    const Image = require("../images.model");
    const Precio = require("../precio/precios.model");
    return {
      images: {
        relation: BaseModel.HasManyRelation,
        modelClass: Image,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.images}.${tableNames.item}_id`,
        },
      },
      precio: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Precio,
        join: {
          from: `${tableNames.item}.${tableNames.precio}_id`,
          to: `${tableNames.precio}_id`,
        },
      },
      logs: {
        relation: BaseModel.HasManyRelation,
        modelClass: Item_log,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.item_log}.${tableNames.item}_id`,
        },
      },
      categoria: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Categoria,
        join: {
          from: `${tableNames.item}.${tableNames.categoria}_id`,
          to: `${tableNames.categoria}.id`,
        },
      },
      categoria2: {
        relation: BaseModel.BelongsToOneRelation,
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
          "marca",
          "descripcion",
          "modelo",
          "barcode",
          "categoria_id",
          "categoria_2_id",
          "color",
          "sku"
        );
      },
      getItemData(builder) {
        builder.select("item.sku", "item.color", "item.marca", "item.modelo");
      },
    };
  }
}

module.exports = Item;
