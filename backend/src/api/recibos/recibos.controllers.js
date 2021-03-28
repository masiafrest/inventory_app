const Item = require("../items/items.model");
const Precio = require("../precio/precios.model");

async function getById(Model, id, res, next) {
  try {
    const results = await Model.query().findById(id);
    res.json(results || "no existe id");
  } catch (err) {
    next(err);
  }
}

async function getItemDB(item_id) {
  const obj = await Item.query().findById(item_id);
  return obj;
}

async function getItemDB(id) {
  return await Item.query().findById(id);
}

async function getPrecioDB(itemDB) {
  const Precio = require("../precio/precios.model");
  return await Precio.query().findById(itemDB.precio_id);
}

async function addToDefectuoso(linea, trx) {
  const cleanLinea = { ...linea };
  delete cleanLinea.devolucion_id;
  delete cleanLinea.id;
  delete cleanLinea.qty;
  delete cleanLinea.salida_item_id;
  const Defectuoso = require("../defectuosos/defectuosos.model");
  return await Defectuoso.query(trx).insert(cleanLinea);
}

// MAYBE: should change itemModQty to a reducer funcion: invReducer(itemInstance: Model, action: {type: string, qty:number, trx: knex.transaction}) => {if actio.type === x increment, else decrement, else return invInstance}
async function itemModQty(itemInstance, qty, trx) {
  //descontar item
  const result = itemInstance.stock - qty;
  return await itemInstance.$query(trx).patch({ stock: result });
}
module.exports = {
  itemModQty,
  addToDefectuoso,
  getItemDB,
  getItemDB,
  getPrecioDB,
  getById,
};
