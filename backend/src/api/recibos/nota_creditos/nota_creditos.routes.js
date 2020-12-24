const express = require("express");

const Nota_credito = require("./nota_creditos.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const nota_creditos = await Nota_credito.query();
    res.json(nota_creditos);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await Nota_credito.transaction(async (trx) => {
      const post = await Nota_credito.query(trx).insertGraph(req.body);
      res.json(post);
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
