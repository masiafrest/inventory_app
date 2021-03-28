const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");
const Item_log = require("./logs/item_logs.model");

class Item extends BaseModel {
  static get tableName() {
    return tableNames.item;
  }

  static get relationMappings() {
    const Categoria = require("../categorias/categorias.model");
    const Lugar = require("../lugares/lugares.model");
    const Image = require("../images.model");
    const Precio = require("../precio/precios.model");
    return {
      lugar: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Lugar,
        join: {
          from: `${tableNames.item}.${tableNames.lugar}_id`,
          to: `${tableNames.lugar}.id`,
        },
      },
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
          to: `${tableNames.precio}.id`,
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
          "sku",
          "stock"
        );
      },
      getItemData(builder) {
        builder.select("item.sku", "item.color", "item.marca", "item.modelo");
      },
    };
  }
  static afterInsert({ items, inputItems, relation }) {
    console.log("Item..........................");
    console.log("items:     ", items);
    console.log("inputItems:", inputItems);
    console.log("relation:  ", relation ? relation.name : "none");
  }
}

module.exports = Item;
