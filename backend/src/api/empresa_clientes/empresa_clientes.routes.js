const express = require("express");

const Empresa_cliente = require("./empresa_clientes.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const empresa_clientes = await Empresa_cliente.query();
    res.json(empresa_clientes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
