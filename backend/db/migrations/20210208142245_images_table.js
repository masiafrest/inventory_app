const { tableNames } = require("../../src/constants/string");
const { addDefaultColumns, references } = require("../../src/lib/tableUtils");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.images, (table) => {
    table.increments().unsigned();
    addDefaultColumns(table);
    references(table, tableNames.item, false);
    references(table, tableNames.usuario, false);
    table.string("url_path");
  });
  await knex.schema.createTable(tableNames.logos, (table) => {
    table.increments().unsigned();
    addDefaultColumns(table);
    references(table, tableNames.empresa_owner, false);
    references(table, tableNames.empresa_cliente, false);
    references(table, tableNames.proveedor, false);
    table.string("url_path");
  });
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists(tableNames.logos);
  await knex.schema.dropTableIfExists(tableNames.images);
};
