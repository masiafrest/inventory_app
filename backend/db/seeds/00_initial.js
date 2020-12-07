const { tableNames } = require('../../src/constants/string');
const { empresa, empresa_cliente, proveedor } = require('../../db/source/data');
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  //await knex('table_name').del()

  // Inserts seed entries
  await knex(tableNames.empresa).insert(empresa);
  await knex(tableNames.empresa_cliente).insert(empresa_cliente);
  await knex(tableNames.proveedor).insert(proveedor);
};
