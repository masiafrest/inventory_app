const express = require("express");

const Transferencia = require("./transferencias.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const transferencias = await Transferencia.query();
    res.json(transferencias);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    // inv_id, qty, lugar_id, para hacer la transferencia
    await Transferencia.transaction(async (trx) => {
      // descontar inv de un lugar1 y agregar a otro inv lugar2
      const transfered = await Transferencia.query(trx).upsertGraph(req.body);
      res.json(transfered);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
