const { tableNames } = require("../../src/constants/string");
const {
  addDefaultColumns,
  addUserClientId,
  references,
} = require("../../src/lib/tableUtils");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.cotizacion, (table) => {
    table.increments().notNullable();
    table.float("total");
    table.float("sub_total");
    table.float("tax");
    addDefaultColumns(table);
    addUserClientId(table);
  });
  await knex.schema.createTable(tableNames.garantia, (table) => {
    table.increments().notNullable();
    table.boolean("resuelto");
    addDefaultColumns(table);
    addUserClientId(table);
  });

  await knex.schema.createTable(tableNames.nota_credito, (table) => {
    table.increments().notNullable();
    table.float("total");
    addDefaultColumns(table);
    addUserClientId(table);
  });
  await knex.schema.createTable(tableNames.devolucion, (table) => {
    table.increments().notNullable();
    table.float("total");
    addDefaultColumns(table);
    addUserClientId(table);
  });
  await knex.schema.createTable(tableNames.pago, (table) => {
    table.increments().notNullable();
    table.float("nequi").unsigned();
    table.float("transferencia").unsigned();
    table.float("efectivo").unsigned();
    table.float("yappi").unsigned();
    references(table, tableNames.nota_credito, false);
    references(
      table,
      tableNames.nota_credito,
      false,
      tableNames.nota_credito + "_2"
    );
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.venta, (table) => {
    table.increments().notNullable();
    table.boolean("credito");
    table.float("total");
    table.float("sub_total");
    table.float("tax");
    table.boolean("pagado");
    table.boolean("entregado");
    references(table, tableNames.pago, false);
    addDefaultColumns(table);
    addUserClientId(table);
  });
  await knex.schema.createTable(tableNames.linea_cotizacion, (table) => {
    table.increments().unsigned();
    references(table, tableNames.cotizacion, false);
    references(table, tableNames.item, true);
    table.integer("qty").unsigned();
    table.float("precio").unsigned();
    table.float("tax");
    table.float("total");
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.linea_venta, (table) => {
    table.increments().unsigned();
    references(table, tableNames.venta, false);
    references(table, tableNames.item, true);
    table.integer("qty").unsigned();
    table.float("precio").unsigned();
    table.float("tax");
    table.float("total");
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.linea_garantia, (table) => {
    table.increments().unsigned();
    references(table, tableNames.garantia);
    references(table, tableNames.item);
    references(table, tableNames.venta, false);
    table.integer("qty");
    table.string("descripcion", 500);
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.linea_nota_credito, (table) => {
    table.increments().unsigned();
    references(table, tableNames.garantia, false);
    references(table, tableNames.nota_credito);
    references(table, tableNames.venta, false);
    table.boolean("valido");
    table.string("descripcion", 500);
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.linea_devolucion, (table) => {
    table.increments().unsigned();
    references(table, tableNames.garantia, false);
    references(table, tableNames.item);
    references(table, tableNames.item, false, "salida_item");
    references(table, tableNames.devolucion);
    table.float("a_efectivo").unsigned().nullable();
    table.integer("qty");
    table.string("descripcion", 500);
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.item_log, (table) => {
    table.increments().notNullable();
    references(table, tableNames.item, true, "", true);
    references(table, tableNames.proveedor, false);
    references(table, tableNames.usuario);
    table
      .enum("evento", [
        "transferencia",
        "venta",
        "garantia",
        "devolucion",
        "nota credito",
        "crear",
        "modificar",
        "defecto",
      ])
      .notNullable();
    table.integer("ajuste").notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.precio_log, (table) => {
    table.increments().notNullable();
    references(table, tableNames.precio);
    references(table, tableNames.item);
    references(table, tableNames.usuario);
    references(table, tableNames.proveedor, false);
    table.float("precio_viejo");
    table.float("costo_viejo");
    table.float("precio_min_viejo");
    addDefaultColumns(table);
  });
};

exports.down = async function (knex) {
  await Promise.all(
    [
      tableNames.precio_log,
      tableNames.item_log,
      tableNames.linea_devolucion,
      tableNames.linea_nota_credito,
      tableNames.linea_garantia,
      tableNames.linea_venta,
      tableNames.linea_cotizacion,
      tableNames.venta,
      tableNames.pago,
      tableNames.devolucion,
      tableNames.nota_credito,
      tableNames.garantia,
      tableNames.cotizacion,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );
};
