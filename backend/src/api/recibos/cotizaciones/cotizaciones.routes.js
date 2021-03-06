const express = require("express");
const Cotizacion = require("./cotizaciones.model");

const { sumTotal, checkPrice } = require("../recibo.helpers");
const { getInvAndPrecioDB } = require("../recibos.controllers");
const router = express.Router();

const graphFetched =
  "[lineas.item(getItemData), usuario(getNameAndId), cliente(getNameAndId)] ";
router.get("/", async (req, res, next) => {
  try {
    const cotizaciones = await Cotizacion.query().withGraphFetched(
      graphFetched
    );
    res.json(cotizaciones);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const cotizaciones = await Cotizacion.query().where("id", req.params.id);
    res.json(cotizaciones);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
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
          const { precioDB } = await getInvAndPrecioDB(linea);
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
