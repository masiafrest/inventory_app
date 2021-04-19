const { tableNames } = require("../../src/constants/string");
const bcrypt = require("bcrypt");

const usuarios = [
  {
    nombre: "sonia",
    password: "celloosonia",
    rol_id: "1",
  },
  {
    nombre: "julio",
    password: "celloojulio",
    rol_id: "3",
  },
];
/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.usuario).del();
  await knex(tableNames.rol).del();

  await knex(tableNames.rol).insert([
    { tipo: "jefe" },
    { tipo: "vendedor" },
    { tipo: "admin" },
  ]);

  const [empresa_owner] = await knex
    .select("id")
    .from(tableNames.empresa_owner);

  const jefa = usuarios[0];
  jefa.password = await bcrypt.hash(jefa.password, 12);
  jefa.empresa_owner_id = empresa_owner.id;
  await knex(tableNames.usuario).insert(jefa);
};
