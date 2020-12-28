const { tableNames } = require("../../src/constants/string");
const {
  addDefaultColumns,
  references,
  createTableIncrementsStringNotNullable,
} = require("../../src/lib/tableUtils");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.defectuoso, (table) => {
    createTableIncrementsStringNotNullable(table);
    references(table, tableNames.inventario);
    references(table, tableNames.lugar);
    table.string("descripcion");
    table.string("estado", 20);
    addDefaultColumns(table);
  });
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists(tableNames.defectuoso);
};
