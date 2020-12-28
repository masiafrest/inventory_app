function sumTotal(linea, ventaTotal) {
  let { sub_total, tax } = ventaTotal;
  //sum precio * qty and add to req.body.sub_total
  const lineaTotal = linea.precio * linea.qty;
  sub_total += lineaTotal;
  //sum tax to req.body.tax
  const notRoundedTax = (lineaTotal / 100) * 7;
  tax += Math.round((notRoundedTax + Number.EPSILON) * 100) / 100;
  ventaTotal = { sub_total, tax };
  return ventaTotal;
}

function checkPrice(linea, precioDB, res) {
  if (linea.precio < precioDB.oferta_precio) {
    res.status(406);
    error = new Error(
      `precio: ${linea.precio}, de inventario ${linea.inventario_id} debajo a la oferta: ${precioDB.oferta_precio}`
    );
    throw error;
  }
  if (linea.precio < precioDB.precio_min && precioDB.oferta_precio == null) {
    res.status(406);
    error = new Error(
      `precio: ${linea.precio}, de inventario ${linea.inventario_id} debajo al precio minimo: ${precioDB.precio_min}`
    );
    throw error;
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

async function invModQty(invInstance, qty, trx) {
  //descontar inventario
  const result = invInstance.qty - qty;
  return await invInstance.$query(trx).patch({ qty: result });
}

function InvLogFactory(headers, linea, evento, id, inv_b_id) {
  return {
    inventario_id: inv_b_id || linea.inventario_id,
    usuario_id: headers.usuario_id,
    empresa_cliente_id: headers.empresa_cliente_id,
    evento,
    ajuste: inv_b_id ? linea.qty : -linea.qty,
    recibo_evento_id: id, // TODO: tal vez hacer un table q relacione recibo evento y hacer referencia
  };
}
async function addToDefectuoso(linea, trx) {
  const cleanLinea = { ...linea };
  delete cleanLinea.qty;
  delete cleanLinea.salida_inventario_id;
  return await Defectuoso.query(trx).insert(cleanLinea);
}
module.exports = {
  addToDefectuoso,
  InvLogFactory,
  getInvAndPrecioDB,
  getInvDB,
  getPrecioDB,
  checkPrice,
  sumTotal,
  invModQty,
};
