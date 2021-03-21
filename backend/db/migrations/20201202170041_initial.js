const { tableNames, tipo_lugar } = require("../../src/constants/string");
const {
  addDefaultColumns,
  addEmail,
  addUrl,
  createTableIncrementsStringNotNullable,
  references,
  addTwoTelephoneColumns,
} = require("../../src/lib/tableUtils");
/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
  await Promise.all([
    knex.schema.createTable(tableNames.rol, (table) => {
      createTableIncrementsStringNotNullable(table);
      table.string("tipo").unique();
    }),
    knex.schema.createTable(tableNames.categoria, (table) => {
      createTableIncrementsStringNotNullable(table, "nombre");
      addDefaultColumns(table);
      table.unique("nombre");
    }),
    knex.schema.createTable(tableNames.cheque, (table) => {
      createTableIncrementsStringNotNullable(table, "nombre");
      table.integer("cheque_num", 20).notNullable();
      table.string("banco", 20).notNullable();
      table.float("cantidad").notNullable();
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.lugar, (table) => {
      createTableIncrementsStringNotNullable(table);
      table.enum("tipo", Object.values(tipo_lugar));
      table.string("direccion");
      table.unique(["direccion", "tipo"]);
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.empresa_owner, (table) => {
      createTableIncrementsStringNotNullable(table, "nombre");
      addEmail(table);
      addUrl(table, "website_url");
      addUrl(table, "logo_url");
      table.string("direccion");
      addDefaultColumns(table);
      addTwoTelephoneColumns(table);
    }),

    knex.schema.createTable(tableNames.proveedor, (table) => {
      createTableIncrementsStringNotNullable(table, "nombre");
      addEmail(table);
      addUrl(table, "website_url"), addUrl(table, "logo_url");
      table.string("pais", 50);
      table.string("direccion");
      addDefaultColumns(table);
      addTwoTelephoneColumns(table);
    }),

    knex.schema.createTable(tableNames.empresa_cliente, (table) => {
      createTableIncrementsStringNotNullable(table, "nombre");
      addEmail(table);
      addUrl(table, "website_url");
      addUrl(table, "logo_url");
      table.string("direccion");
      addDefaultColumns(table);
      addTwoTelephoneColumns(table);
    }),
  ]);

  await knex.schema.createTable(tableNames.precio, (table) => {
    table.increments().notNullable();
    table.float("precio").unsigned();
    table.boolean("oferta");
    table.float("oferta_precio").unsigned();
    table.float("costo").unsigned();
    table.float("precio_min").unsigned();
    references(table, tableNames.proveedor, false);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item, (table) => {
    createTableIncrementsStringNotNullable(table, "marca");
    table.string("modelo");
    table.string("color");
    table.integer("qty").notNullable().unsigned();
    table.string("descripcion");
    table.string("barcode");
    table.string("sku", 12);
    addUrl(table, "image_url");
    references(table, tableNames.precio);
    references(table, tableNames.categoria, true);
    references(table, tableNames.categoria, false, `${tableNames.categoria}_2`);
    references(table, tableNames.lugar);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.usuario, (table) => {
    createTableIncrementsStringNotNullable(table, "nombre");
    references(table, tableNames.empresa_owner);
    addEmail(table);
    addUrl(table, "image_url");
    table.string("password", 127).notNullable();
    references(table, tableNames.rol);
    addDefaultColumns(table);
    addTwoTelephoneColumns(table);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists(tableNames.usuario);
  await knex.schema.dropTableIfExists(tableNames.item);
  await knex.schema.dropTableIfExists(tableNames.precio);
  await knex.schema.dropTableIfExists(tableNames.empresa_cliente);
  await knex.schema.dropTableIfExists(tableNames.proveedor);
  await knex.schema.dropTableIfExists(tableNames.empresa_owner);
  await Promise.all([
    knex.schema.dropTableIfExists(tableNames.lugar),
    knex.schema.dropTableIfExists(tableNames.cheque),
    knex.schema.dropTableIfExists(tableNames.categoria),
    knex.schema.dropTableIfExists(tableNames.rol),
  ]);
};
