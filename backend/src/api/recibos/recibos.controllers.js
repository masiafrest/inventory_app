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
  delete cleanLinea.qty;
  delete cleanLinea.salida_inventario_id;
  const Defectuoso = require("../items/inventarios/defectuosos/defectuosos.model");
  await Defectuoso.query(trx).insert(cleanLinea);
}
module.exports = {
  addToDefectuoso,
  getInvAndPrecioDB,
  getInvDB,
  getPrecioDB,
  getById,
};
