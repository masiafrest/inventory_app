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

async function getInvDB(linea) {
  const Inventario = require("../items/inventarios/inventarios.model");
  return await Inventario.query().findById(linea.inventario_id);
}

async function getPrecioDB(invDB) {
  const Precio = require("../precio/precios.model");
  return await Precio.query().findById(invDB.precio_id);
}

function InvLogFactory(headers, linea, evento, id) {
  return {
    inventario_id: linea.inventario_id,
    usuario_id: headers.usuario_id,
    empresa_cliente_id: headers.empresa_cliente_id,
    evento,
    ajuste: -linea.qty,
    venta_id: id,
  };
}
module.exports = {
  InvLogFactory,
  getInvDB,
  getPrecioDB,
  checkPrice,
  sumTotal,
};
