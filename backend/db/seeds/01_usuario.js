const { usuario } = require('../../db/source/data');
const { tableNames } = require('../../src/constants/string');

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.usuario).del()
  const empresa_owner_id = await knex.select('id').from(tableNames.empresa_owner);
  console.log(empresa_owner_id)
  const addIdToUsuario = usuario.map(data => data = { ...data, empresa_owner_id: empresa_owner_id[0].id })
  console.log(addIdToUsuario[1])
  await knex(tableNames.usuario).insert(addIdToUsuario[1]);
};
