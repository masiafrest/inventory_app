const BaseModel = require("../BaseModel");
const { tableNames } = require("../../constants/string");

class Item extends BaseModel {
  static get tableName() {
    return tableNames.item;
  }

  static get relationMappings() {
    const Inventario = require("./inventarios/inventarios.model");
    const Categoria = require("../categorias/categorias.model");
    return {
      inventarios: {
        relation: BaseModel.HasManyRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.inventario}.${tableNames.item}_id`,
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
          "image_url",
          "categoria_id",
          "categoria_2_id"
        );
      },
    };
  }
  static beforeInsert({ inputItems }) {
    console.log(inputItems);
  }
}

module.exports = Item;
