const express = require("express");
const Inventario = require("../../items/inventarios/inventarios.model");
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
        const precioId = await Inventario.query()
          .findById(linea.inventario_id)
          .select("precio_id");

        const precioDB = await Precio.query().findById(precioId.precio_id);
        // TODO derepente usando un funcion recursion para saber si es menor q oferta o precio min
        if (linea.precio <= precioDB.oferta_precio) {
          res.status(406);
          res.json("precio debajo del oferta");
        }
        if (linea.precio <= precioDB.precio_min) {
          res.status(406);
          res.json("precio debajo del minimo");
        }
      });
    }
    //TODO descontar del inventario la cantidad
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
