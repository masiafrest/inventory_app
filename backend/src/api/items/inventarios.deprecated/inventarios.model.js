const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Inventario extends BaseModel {
  static get tableName() {
    return tableNames.inventario;
  }

  static get relationMappings() {
    const Item = require("../items.model");
    const Lugar = require("../../lugares/lugares.model");
    const Precio = require("../../precio/precios.model");
    const Inventario_log = require("./logs.deprecated/inventario_logs.model");
    //const Precio_log = require("../../precio/precio_logs.model");
    return {
      logs: {
        relation: BaseModel.HasManyRelation,
        modelClass: Inventario_log,
        join: {
          from: `${tableNames.inventario}.id`,
          to: `${tableNames.inventario_log}.${tableNames.inventario}_id`,
        },
      },
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: `${tableNames.inventario}.${tableNames.item}_id`,
          to: `${tableNames.item}.id`,
        },
      },
      lugar: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Lugar,
        join: {
          from: `${tableNames.inventario}.${tableNames.lugar}_id`,
          to: `${tableNames.lugar}.id`,
        },
      },
      precio: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Precio,
        join: {
          from: `${tableNames.inventario}.${tableNames.precio}_id`,
          to: `${tableNames.precio}.id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "item_id", "qty", "basura", "color", "sku");
      },
      getItemData(builder) {
        builder
          .join("item", { "inventario.item_id": "item.id" })
          .select(
            "inventario.sku",
            "inventario.color",
            "item.marca",
            "item.modelo"
          );
      },
    };
  }
}

module.exports = Inventario;
