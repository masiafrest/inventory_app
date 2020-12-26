const express = require("express");
const Cotizacion = require("./cotizaciones.model");

const {
  sumTotal,
  getInvDB,
  getPrecioDB,
  checkPrice,
} = require("../recibo.helpers");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const cotizaciones = await Cotizacion.query();
    res.json(cotizaciones);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  console.log("👣 req.body: ", req.body);
  const { usuario_id, empresa_cliente_id, lineas } = req.body;
  //resetear total, subtotal y tax a 0 para calcualr en el server
  let ventaTotal = {
    sub_total: 0,
    tax: 0,
    total: 0,
  };
  try {
    await Cotizacion.transaction(async (trx) => {
      await Promise.all(
        lineas.map(async (linea) => {
          const precioDB = await getPrecioDB(linea);
          //check is precio is above precio_min
          checkPrice(linea, precioDB, res);
          ventaTotal = sumTotal(linea, ventaTotal);
        })
      );
      // add tax and sub_total to req.body.total
      ventaTotal.total = ventaTotal.tax + ventaTotal.sub_total;
      const insertedCotizacion = await Cotizacion.query(trx).insertGraph({
        ...ventaTotal,
        empresa_cliente_id,
        usuario_id,
        lineas: lineas,
      });
      console.log("finish insertGraph");
      res.send(insertedCotizacion);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
