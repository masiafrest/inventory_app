const { tableNames } = require("../../src/constants/string");

const items = [
  {
    marca: "sony",
    descripcion: "un equipo",
    modelo: "qwer",
    barcode: "0000000000",
    image_url: "www.com",
  },
  {
    marca: "huawei",
    descripcion: "un audifono",
    modelo: "yuio",
    barcode: "00000001111",
    image_url: "www.huaw.com",
  },
];

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.lugar).del();
  await knex(tableNames.categoria).del();
  await knex(tableNames.item).del();
  await knex(tableNames.inventario).del();
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
  const itemCategory = items.map(
    (item) => (item = { ...item, categoria_id: categoria_ids[0] })
  );

  const item_ids = await knex(tableNames.item).insert(itemCategory, "id");
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
  await knex(tableNames.inventario).insert([
    {
      item_id: item_ids[0],
      qty: 25,
      lugar_id: lugar_ids[0],
      color: "negro",
      precio_id: precio_id,
      sku: "so-qwe",
    },
    {
      item_id: item_ids[1],
      qty: 45,
      lugar_id: lugar_ids[1],
      color: "rojo",
      precio_id: precio_id,
      sku: "hua-yui",
    },
  ]);
};
