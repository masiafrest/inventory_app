const express = require("express");
const Inventario = require("../../items/inventarios/inventarios.model");
const Inventario_log = require("../../items/inventarios/logs/inventario_logs.model");
const Precio = require("../../precio/precios.model");

const Venta = require("./ventas.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const ventas = await Venta.query();
    res.json(ventas);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    //resetear total, subtotal y tax a 0 para calcualr en el server
    let sub_total = 0;
    let tax = 0;
    let total = 0;
    if (req.body.hasOwnProperty("lineas")) {
      console.log("has lineas");
      // descontar la qty de inventario y agregar historial al inv_log
      await Promise.all(
        // usamos Promise porq map a un array y en los callback hacer await hace q map regrese un array con objeto de promesa pendiente y no agregara sub_total, tax y total a req.body por q esta pendiente la promesa
        req.body.lineas.map(async (linea) => {
          console.log("Map Linea ", linea.inventario_id);
          //check is precio is above precio_min
          const inventarioDb = await Inventario.query().findById(
            linea.inventario_id
          );
          const precioDB = await Precio.query().findById(
            inventarioDb.precio_id
          );
          // TODO derepente usando un funcion recursion para saber si es menor q oferta o precio min
          console.log("checking price match DB price", precioDB);
          if (linea.precio <= precioDB.oferta_precio) {
            res.status(406);
            res.json("precio debajo del oferta");
          }
          if (linea.precio <= precioDB.precio_min) {
            res.status(406);
            res.json("precio debajo del minimo");
          }
          //sum precio * qty and add to req.body.sub_total
          const lineaTotal = linea.precio * linea.qty;
          sub_total += lineaTotal;
          //sum tax to req.body.tax
          const notRoundedTax = (lineaTotal / 100) * 7;
          tax += Math.round((notRoundedTax + Number.EPSILON) * 100) / 100;
          // add tax and sub_total to req.body.total
          total += tax + sub_total;
          // descontar y hacer historial del inventario
          await Inventario.transaction(async (trx) => {
            //descontar inventario
            const result = inventarioDb.qty - linea.qty;
            await inventarioDb.$query(trx).patch({ qty: result });
            // hacer el inventario log
            await Inventario_log.query(trx).insert({
              inventario_id: inventarioDb.id,
              usuario_id: req.body.usuario_id,
              evento: "venta",
              ajuste: -linea.qty,
            });
          });
        })
      );
    }
    //insertar la venta
    req.body = { ...req.body, sub_total, tax, total };
    await Venta.transaction(async (trx) => {
      const ventaPosted = await Venta.query(trx).insertGraph({
        ...req.body,
      });

      res.json(ventaPosted);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
