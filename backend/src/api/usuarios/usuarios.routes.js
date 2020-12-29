const express = require("express");
const Usuario = require("./usuarios.model");
const router = express.Router();
const { signUp } = require("../auth/auth.controllers");

router.get("/", async (req, res, next) => {
  try {
    const usuarios = await Usuario.query().where("deleted_at", null);
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
});

router.get("/:x", async (req, res, next) => {
  try {
    const paramType = isNaN(req.params.x);
    let usuario;
    if (!paramType) {
      usuario = await Usuario.query().findById(req.params.x);
    } else {
      usuario = await Usuario.query().where("nombre", req.params.x);
    }
    res.json(usuario);
  } catch (err) {
    next(err);
  }
});

router.post("/addUser", signUp);

// to post user, se usa auth desde rol jefa
module.exports = router;
