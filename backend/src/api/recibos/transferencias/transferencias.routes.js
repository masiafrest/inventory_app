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

module.exports = router;
