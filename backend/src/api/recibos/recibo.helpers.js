const Precio = require("../precio/precios.model");
const Inventario = require("../items/inventarios/inventarios.model");

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

async function getPrecioId(linea) {
  const inventarioDb = await Inventario.query().findById(linea.inventario_id);
  const precioDB = await Precio.query().findById(inventarioDb.precio_id);
  return { precioDB, inventarioDb };
}
module.exports = {
  getPrecioId,
  checkPrice,
  sumTotal,
};
