const { usuarios } = require("../../db/source/data");
const { tableNames } = require("../../src/constants/string");
const bcrypt = require("bcrypt");

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.usuario).del();
  const [empresa_owner_id] = await knex
    .select("id")
    .from(tableNames.empresa_owner);
  console.log("empresa_owner_id", empresa_owner_id);

  const jefa = usuarios[0];
  console.log(jefa);
  jefa.password = await bcrypt.hash(jefa.password, 12);
  jefa.empresa_owner_id = empresa_owner_id.id;
  console.log("hashed usuario: ", jefa);
  await knex(tableNames.usuario).insert(jefa);
};
