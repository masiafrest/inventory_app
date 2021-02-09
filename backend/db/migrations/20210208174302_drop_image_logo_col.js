const { tableNames } = require("../../src/constants/string");
const { addUrl } = require("../../src/lib/tableUtils");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
  await knex.schema.alterTable(tableNames.empresa_cliente, (table) => {
    table.dropColumn("logo_id");
  });
  await knex.schema.alterTable(tableNames.empresa_owner, (table) => {
    table.dropColumn("logo_id");
  });
  await knex.schema.alterTable(tableNames.proveedor, (table) => {
    table.dropColumn("logo_id");
  });
  await knex.schema.alterTable(tableNames.item, (table) => {
    table.dropColumn("images_id");
  });
  await knex.schema.alterTable(tableNames.usuario, (table) => {
    table.dropColumn("images_id");
  });
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
  await knex.schema.alterTable(tableNames.empresa_cliente, (table) => {
    addUrl(table, "logo_id");
  });
  await knex.schema.alterTable(tableNames.empresa_owner, (table) => {
    addUrl(table, "logo_id");
  });
  await knex.schema.alterTable(tableNames.proveedor, (table) => {
    addUrl(table, "logo_id");
  });
  await knex.schema.alterTable(tableNames.item, (table) => {
    addUrl(table, "images_id");
  });
  await knex.schema.alterTable(tableNames.usuario, (table) => {
    addUrl(table, "images_id");
  });
};
