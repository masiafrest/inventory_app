const express = require("express");

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
  } catch (err) {
    next(err);
  }
});

module.exports = router;
