const { tableNames } = require("../../src/constants/string");
const {
  addDefaultColumns,
  addEmail,
  addUrl,
  createTableOneStringColumn,
  createTableIncrementsStringNotNullable,
  references,
} = require("../../src/lib/tableUtils");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.recibo_encabezado, (table) => {
    table.increments().notNullable();
    references(table, tableNames.empresa_cliente);
    references(table, tableNames.usuario);
    table.enum("tipo", [
      "cotizacion",
      "venta",
      "garantia",
      "nota_credito",
      "devolucion",
      "reparacion",
    ]);
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.cotizacion, (table) => {
    table.increments().notNullable();
    references(table, tableNames.recibo_encabezado);
    table.float("total");
    table.float("sub_total");
    table.float("tax");
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.garantia, (table) => {
    table.increments().notNullable();
    references(table, tableNames.recibo_encabezado);
    table.boolean("resuelto");
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.nota_credito, (table) => {
    table.increments().notNullable();
    references(table, tableNames.recibo_encabezado);
    table.float("total");
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.devolucion, (table) => {
    table.increments().notNullable();
    references(table, tableNames.recibo_encabezado);
    table.float("total");
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.pago, (table) => {
    table.increments().notNullable();
    table.float("nequi").unsigned();
    table.float("transferencia").unsigned();
    table.float("efectivo").unsigned();
    table.float("yappi").unsigned();
    references(table, tableNames.nota_credito);
    references(
      table,
      tableNames.nota_credito,
      true,
      tableNames.nota_credito + "_2"
    );
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.venta, (table) => {
    table.increments().notNullable();
    references(table, tableNames.recibo_encabezado);
    table.boolean("credito");
    table.float("total");
    table.float("sub_total");
    table.float("tax");
    table.boolean("pagado");
    table.boolean("entregado");
    references(table, tableNames.pago, false);
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.linea_cotizacion, (table) => {
    table.increments().unsigned();
    references(table, tableNames.cotizacion, false);
    references(table, tableNames.item, true, "inventario");
    table.integer("qty").unsigned();
    table.float("precio").unsigned();
    table.float("tax");
    table.float("total");
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.linea_venta, (table) => {
    table.increments().unsigned();
    references(table, tableNames.venta, false);
    references(table, tableNames.item, true, "inventario");
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
    references(table, tableNames.garantia);
    references(table, tableNames.nota_credito);
    references(table, tableNames.venta, false);
    table.boolean("valido");
    table.string("descripcion", 500);
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.linea_devolucion, (table) => {
    table.increments().unsigned();
    references(table, tableNames.garantia);
    references(table, tableNames.item, false, "item_salida");
    references(table, tableNames.item, false, "item_entrada");
    references(table, tableNames.devolucion);
    table.integer("qty");
    table.string("descripcion", 500);
    table.integer("total");
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.inventario_log, (table) => {
    table.increments().notNullable();
    references(table, tableNames.inventario, true, "", true);
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
      ])
      .notNullable();
    table.integer("ajuste").notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.precio_log, (table) => {
    table.increments().notNullable();
    references(table, tableNames.precio);
    references(table, tableNames.inventario);
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
      tableNames.inventario_log,
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
      tableNames.recibo_encabezado,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );
};
