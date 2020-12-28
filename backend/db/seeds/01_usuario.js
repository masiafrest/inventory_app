const { tableNames } = require("../../src/constants/string");
const bcrypt = require("bcrypt");

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.usuario).del();
  await knex(tableNames.rol).del();

  await knex(tableNames.rol).insert([{ tipo: "jefe" }, { tipo: "vendedor" }]);

  const [empresa_owner] = await knex
    .select("id")
    .from(tableNames.empresa_owner);

  const jefa = usuarios[0];
  jefa.password = await bcrypt.hash(jefa.password, 12);
  jefa.empresa_owner_id = empresa_owner.id;
  await knex(tableNames.usuario).insert(jefa);
};
const usuarios = [
  {
    nombre: "sonia",
    password: "aA1@123",
    rol_id: "1",
  },
  {
    nombre: "hello",
    password: "aA1@123",
    rol_id: "2",
  },
];
