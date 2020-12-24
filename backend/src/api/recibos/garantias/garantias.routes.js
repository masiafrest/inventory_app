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
  } catch (err) {
    next(err);
  }
});
module.exports = router;
