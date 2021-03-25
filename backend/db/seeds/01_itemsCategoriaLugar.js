const { tableNames } = require("../../src/constants/string");

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.lugar).del();
  await knex(tableNames.categoria).del();
  await knex(tableNames.item).del();
  await knex(tableNames.precio).del();

  const lugar_ids = await knex(tableNames.lugar).insert(
    [
      {
        direccion: "dorado",
        tipo: "tienda",
      },
      {
        direccion: "condado",
        tipo: "bodega",
      },
    ],
    "id"
  );

  const categoria_ids = await knex(tableNames.categoria).insert(
    [{ nombre: "audifono" }, { nombre: "bocina" }],
    "id"
  );

  let [precio_id] = await knex(tableNames.precio).insert(
    {
      precio: 10.99,
      precio_min: 7.99,
      costo: 5.99,
      oferta: true,
      oferta_precio: 6.99,
    },
    "id"
  );

  const items = [
    {
      marca: "sony",
      descripcion: "un equipo",
      modelo: "qwer",
      barcode: "0000000000",
      stock: 25,
      lugar_id: lugar_ids[0],
      color: "negro",
      precio_id: precio_id,
      sku: "so-qwe",
      categoria_id: categoria_ids[0],
    },
    {
      marca: "huawei",
      descripcion: "un audifono",
      modelo: "yuio",
      barcode: "00000001111",
      stock: 45,
      lugar_id: lugar_ids[1],
      color: "rojo",
      precio_id: precio_id,
      sku: "hua-yui",
      categoria_id: categoria_ids[1],
    },
  ];
  await knex(tableNames.item).insert(items);
};
