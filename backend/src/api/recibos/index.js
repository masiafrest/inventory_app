const router = require("express").Router();
const cotizaciones = require("./cotizaciones/cotizaciones.routes");
const ventas = require("./ventas/ventas.routes");
router.get("/", (req, res) => {
  res.send("recibos api");
});
router.use("/cotizaciones", cotizaciones);
router.use("/ventas", ventas);
module.exports = router;
