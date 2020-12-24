const express = require("express");

const Garantia = require("./garantias.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const garantias = await Garantia.query();
    res.json(garantias);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // TODO tal vez crear tabla de cliente_item_comprado, donde acumula los item comprado con columna cliente_id, inventario_id, qty, asi se resta de qty o suma
    await Garantia.transaction(async (trx) => {
      const post = await Garantia.query(trx).insertGraph(req.body);
      res.json(post);
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
