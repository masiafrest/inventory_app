const express = require("express");
const Lugar = require("./lugares.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const lugares = await Lugar.query().where("deleted_at", null);
    res.json(lugares);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { direccion, tipo } = req.body;
  try {
    console.log(direccion, tipo);
    const existLugar = await Lugar.query().where({ direccion }).first();
    if (existLugar) {
      const error = new Error("direcion existe");
      res.status(403);
      throw error;
    }
    await Lugar.transaction(async (trx) => {
      const lugarInserted = await Lugar.query(trx).insert(req.body);
      res.send(lugarInserted);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
