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
    console.log("ventas req.body: ", req.body);
    if (req.body.hasOwnProperty("lineas")) {
      console.log("has lineas");
      req.body.lineas.map(async (linea) => {
        //check is precio is above precio_min
        const inventarioDb = await Inventario.query().findById(
          linea.inventario_id
        );
        console.log("😀MAP linea inventarioDB: ", inventarioDb);
        const precioDB = await Precio.query().findById(inventarioDb.precio_id);
        // TODO derepente usando un funcion recursion para saber si es menor q oferta o precio min
        if (linea.precio <= precioDB.oferta_precio) {
          res.status(406);
          res.json("precio debajo del oferta");
        }
        if (linea.precio <= precioDB.precio_min) {
          res.status(406);
          res.json("precio debajo del minimo");
        }
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
      });
    }
    //insertar la venta
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
