const { tableNames } = require("../../src/constants/string");
const { addDefaultColumns, references } = require("../../src/lib/tableUtils");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
  await knex.schema.alterTable(tableNames.empresa_cliente, (table) => {
    table.renameColumn("logo_url", "logo_id");
  });
  await knex.schema.alterTable(tableNames.empresa_owner, (table) => {
    table.renameColumn("logo_url", "logo_id");
  });
  await knex.schema.alterTable(tableNames.proveedor, (table) => {
    table.renameColumn("logo_url", "logo_id");
  });
  await knex.schema.alterTable(tableNames.item, (table) => {
    table.renameColumn("image_url", "images_id");
  });
  await knex.schema.alterTable(tableNames.usuario, (table) => {
    table.renameColumn("image_url", "images_id");
  });
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
  await knex.schema.alterTable(tableNames.empresa_cliente, (table) => {
    table.renameColumn("logo_id", "logo_url");
  });
  await knex.schema.alterTable(tableNames.empresa_owner, (table) => {
    table.renameColumn("logo_id", "logo_url");
  });
  await knex.schema.alterTable(tableNames.proveedor, (table) => {
    table.renameColumn("logo_id", "logo_url");
  });
  await knex.schema.alterTable(tableNames.item, (table) => {
    table.renameColumn("images_id", "image_url");
  });
  await knex.schema.alterTable(tableNames.usuario, (table) => {
    table.renameColumn("images_id", "image_url");
  });
};
