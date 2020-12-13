const express = require("express");
const Cotizacion = require("./cotizaciones.model");

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
  const { usuario_id, empresa_cliente_id, lineas, total } = req.body;

  try {
    await Cotizacion.transaction(async (trx) => {
      const insertedCotizacion = await Cotizacion.query(trx).insertGraph({
        total,
        encabezado: [
          {
            empresa_cliente_id,
            usuario_id,
          },
        ],
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
