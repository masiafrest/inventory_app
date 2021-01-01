async function getById(Model, id, res, next) {
  try {
    const results = await Model.query().findById(id);
    res.json(results || "no existe id");
  } catch (err) {
    next(err);
  }
}

async function getInvAndPrecioDB(inv) {
  let obj = {};
  const Inventario = require("../items/inventarios/inventarios.model");
  obj.invDB = await Inventario.query().findById(inv.inventario_id);
  const Precio = require("../precio/precios.model");
  obj.precioDB = await Precio.query().findById(obj.invDB.precio_id);
  return obj;
}

async function getInvDB(id) {
  const Inventario = require("../items/inventarios/inventarios.model");
  return await Inventario.query().findById(id);
}

async function getPrecioDB(invDB) {
  const Precio = require("../precio/precios.model");
  return await Precio.query().findById(invDB.precio_id);
}
async function addToDefectuoso(linea, trx) {
  const cleanLinea = { ...linea };
  delete cleanLinea.devolucion_id;
  delete cleanLinea.id;
  delete cleanLinea.qty;
  delete cleanLinea.salida_inventario_id;
  const Defectuoso = require("../items/inventarios/defectuosos/defectuosos.model");
  return await Defectuoso.query(trx).insert(cleanLinea);
}

// MAYBE: should change invModQty to a reducer funcion: invReducer(invInstance: Model, action: {type: string, qty:number, trx: knex.transaction}) => {if actio.type === x increment, else decrement, else return invInstance}
async function invModQty(invInstance, qty, trx) {
  //descontar inventario
  const result = invInstance.qty - qty;
  return await invInstance.$query(trx).patch({ qty: result });
}
module.exports = {
  invModQty,
  addToDefectuoso,
  getInvAndPrecioDB,
  getInvDB,
  getPrecioDB,
  getById,
};
