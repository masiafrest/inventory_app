const { tableNames } = require('../../src/constants/string');

const items = [{
  nombre: 'sony',
  descripcion: 'un equipo',
  modelo: 'qwer',
  barcode: '0000000000',
  sku: 'so-qwe',
  image_url: 'www.com',
}, {
  nombre: 'huawei',
  descripcion: 'un audifono',
  modelo: 'yuio',
  barcode: '00000001111',
  sku: 'hua-yui',
  image_url: 'www.huaw.com'
}]

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.lugar).del();
  await knex(tableNames.categoria).del();
  await knex(tableNames.item).del();
  await knex(tableNames.item_inventario).del();
  await knex(tableNames.precio).del();

  const lugar_ids = await knex(tableNames.lugar).insert([{
    dirrecion: 'dorado', tipo: 'tienda'
  },
  {
    dirrecion: 'condado', tipo: 'bodega'
  }], 'id')

  const categoria_ids = await knex(tableNames.categoria).insert([{ nombre: 'audifono' }, { nombre: 'bocina' }], 'id');
  console.log('ids: ', categoria_ids)
  const itemCategory = items.map(item => item = { ...item, categoria_id: categoria_ids[0] })
  console.log('itemsCategory: ', itemCategory)
  console.log('items', items)

  const item_ids = await knex(tableNames.item).insert(itemCategory, 'id')
  let [precio_id] = await knex(tableNames.precio).insert({ precio: 10.99 }, 'id');
  console.log('👩 precio_id: ', precio_id);
  console.log('👩 item_ids: ', item_ids);
  console.log('👩 lugar_ids: ', lugar_ids);
  await knex(tableNames.item_inventario).insert([
    {
      item_id: item_ids[0],
      qty: 25,
      lugar_id: lugar_ids[0],
      color: 'negro',
      precio_id: precio_id
    },
    {
      item_id: item_ids[1],
      qty: 45,
      lugar_id: lugar_ids[1],
      color: 'rojo',
      precio_id: precio_id
    },
  ])
};