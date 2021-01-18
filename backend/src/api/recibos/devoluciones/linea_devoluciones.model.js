const BaseModel = require("../../BaseModel");
const { tableNames } = require("../../../constants/string");

class Linea_devolucion extends BaseModel {
  static get tableName() {
    return tableNames.linea_devolucion;
  }

  static get relationMappings() {
    const Inventario = require("../../items/inventarios/inventarios.model");
    const Garantia = require("../garantias/garantias.model");
    const Devolucion = require("./devoluciones.model");
    return {
      invSalida: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.inventario}.id`,
          to: `${tableNames.linea_devolucion}.salida_${tableNames.inventario}_id`,
        },
      },
      invEntrada: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Inventario,
        join: {
          from: `${tableNames.inventario}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.inventario}_id`,
        },
      },

      garantia: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Garantia,
        join: {
          from: `${tableNames.garantia}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.garantia}_id`,
        },
      },
      devolucion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Devolucion,
        join: {
          from: `${tableNames.devolucion}.id`,
          to: `${tableNames.linea_devolucion}.${tableNames.devolucion}_id`,
        },
      },
    };
  }
  static get modifiers() {
    return {
      getItemData(builder) {
        builder
          .join("inventario", {
            "linea_devolucion.inventario_id": "inventario.id",
          })
          .join("item", { "inventario.item_id": "item.id" })
          .join("precio", { "inventario.precio_id": "precio.id" })
          .select(
            "linea_devolucion.*",
            "inventario.sku",
            "item.marca",
            "item.modelo",
            "precio.precio"
          );
      },
    };
  }
}

module.exports = Linea_devolucion;
