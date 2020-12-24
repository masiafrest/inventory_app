const router = require("express").Router();
const cotizaciones = require("./cotizaciones/cotizaciones.routes");
const ventas = require("./ventas/ventas.routes");
const devoluciones = require("./devoluciones/devoluciones.routes");
const garantias = require("./garantias/garantias.routes");
const nota_creditos = require("./nota_creditos/nota_creditos.routes");
// TODO agregar los recibos
router.get("/", (req, res) => {
  res.send("recibos api");
});
router.use("/nota_credito", nota_creditos);
router.use("/garantia", garantias);
router.use("/devolucion", devoluciones);
router.use("/cotizacion", cotizaciones);
router.use("/venta", ventas);
module.exports = router;
