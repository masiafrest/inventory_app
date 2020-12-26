const { usuarios } = require("../../db/source/data");
const { tableNames } = require("../../src/constants/string");
const bcrypt = require("bcrypt");

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.usuario).del();
  await knex(tableNames.rol).del();

  await knex(tableNames.rol).insert({ tipo: "jefe" });
  await knex(tableNames.rol).insert({ tipo: "vendedor" });
  const [empresa_owner_id] = await knex
    .select("id")
    .from(tableNames.empresa_owner);

  const jefa = usuarios[0];
  jefa.password = await bcrypt.hash(jefa.password, 12);
  jefa.empresa_owner_id = empresa_owner_id.id;
  await knex(tableNames.usuario).insert(jefa);
};
