const { tableNames } = require("../../src/constants/string");
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));
  //await knex('table_name').del()

  // Inserts seed entries
  await knex(tableNames.empresa_owner).insert({
    nombre: "cello",
    direccion: "dorado, al lado de sunly",
    telefono: "6502-3888",
    email: "cello@cello.com",
    website_url: "www.cello.com",
  });
  await knex(tableNames.empresa_cliente).insert(empresa_clientes);
  await knex(tableNames.proveedor).insert(proveedor);
};

const empresa_clientes = [
  {
    nombre: "multicell",
    direccion: "dorado mall",
    telefono: "5555-5555",
  },
  {
    nombre: "panacell",
    direccion: "los pueblo",
    telefono: "555-1234",
  },
];

const proveedor = [
  {
    nombre: "china-producto",
    direccion: "china",
    telefono: "01-5555-5555",
  },
  {
    nombre: "china-producto2",
    direccion: "china",
    telefono: "02-5555-5555",
  },
];
