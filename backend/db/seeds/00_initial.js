const { tableNames } = require('../../src/constants/string');
const { empresa_clientes, proveedor, usuario } = require('../../db/source/data');
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await Promise.all(Object.keys(tableNames).map(name => knex(name).del()))
  //await knex('table_name').del()

  // Inserts seed entries
  await knex(tableNames.empresa_owner).insert({
    nombre: 'cello',
    direccion: 'dorado, al lado de sunly',
    telefono: '6502-3888',
    email: 'cello@cello.com',
    website_url: 'www.cello.com',
  });
  await knex(tableNames.empresa_cliente).insert(empresa_clientes);
  await knex(tableNames.proveedor).insert(proveedor);
};
