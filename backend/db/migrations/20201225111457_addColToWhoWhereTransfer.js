const { tableNames } = require("../../src/constants/string");
const { references } = require("../../src/lib/tableUtils");
/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
  await knex.schema.alterTable(tableNames.inventario_log, (table) => {
    references(table, tableNames.empresa_cliente, false);
    references(table, tableNames.venta, false);
  });
};
/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
  await Promise.all(
    [(tableNames.empresa_cliente, tableNames.venta)].map((tableName) => {
      knex.schema.dropTableIfExists(tableName + "_id");
    })
  );
};
