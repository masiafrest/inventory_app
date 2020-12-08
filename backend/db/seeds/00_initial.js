const { tableNames } = require('../../src/constants/string');
const { empresa, empresa_clientes, proveedor, usuario } = require('../../db/source/data');
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await Promise.all(Object.keys(tableNames).map(name => knex(name).del()))
  //await knex('table_name').del()

  // Inserts seed entries
  await knex(tableNames.empresa_owner).insert(empresa);
  await knex(tableNames.empresa_cliente).insert(empresa_clientes);
  await knex(tableNames.proveedor).insert(proveedor);
};
