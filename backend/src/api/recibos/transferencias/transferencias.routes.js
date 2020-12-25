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
    // TODO inv log talvez column de aquien se transfirio, cliente_id, venta_id, basura?, todas o algunas col
    await Transferencia.transaction(async (trx) => {});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
