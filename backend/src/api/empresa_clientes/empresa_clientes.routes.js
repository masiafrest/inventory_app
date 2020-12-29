const express = require("express");

const Empresa_cliente = require("./empresa_clientes.model");
const { findByIdOrName } = require("../../lib/helpers");
const yupSchema = require("../../lib/yupSchema");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const empresa_clientes = await Empresa_cliente.query();
    res.json(empresa_clientes);
  } catch (err) {
    next(err);
  }
});

router.get("/:x", async (req, res, next) => {
  await findByIdOrName(Empresa_cliente, req.params.x, res, next);
});

router.post("/", async (req, res, next) => {
  try {
    await yupSchema.validate(req.body, { abortEarly: false });
    let cliente = await Empresa_cliente.query()
      .where("nombre", req.body.nombre)
      .first();
    if (cliente) {
      res.status(403);
      throw new Error("nombre o empresa existe");
    }
    await Empresa_cliente.transaction(async (trx) => {
      cliente = await Empresa_cliente.query(trx).insert(req.body);
      res.json(cliente);
    });
  } catch (error) {
    next(error);
  }
});
// TODO: post a client
module.exports = router;
