const express = require("express");
const Usuario = require("./usuarios.model");
const router = express.Router();
const { signUp } = require("../auth/auth.controllers");
const { findByIdOrName } = require("../../lib/helpers");

router.get("/", async (req, res, next) => {
  try {
    const usuarios = await Usuario.query().where("deleted_at", null);
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
});

router.get("/:x", async (req, res, next) => {
  await findByIdOrName(Usuario, req.params.x, res, next);
});

router.post("/addUser", signUp);

// to post user, se usa auth desde rol jefa
module.exports = router;
