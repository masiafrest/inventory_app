const { ref } = require("../../src/api/BaseModel");
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
  await knex.schema.createTable(tableNames.transferencia, (table) => {
    createTableIncrementsStringNotNullable(table);
    references(table, tableNames.usuario);
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.linea_transferencia, (table) => {
    createTableIncrementsStringNotNullable(table);
    references(table, tableNames.transferencia);
    references(table, tableNames.inventario);
    references(table, tableNames.lugar, true, "de_lugar");
    references(table, tableNames.lugar, true, "a_lugar");
    table.integer("qty");
    addDefaultColumns(table);
  });
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists(tableNames.linea_transferencia);
  await knex.schema.dropTableIfExists(tableNames.transferencia);
};
//add role table
