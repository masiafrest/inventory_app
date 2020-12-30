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

// to post user, se usa auth desde rol jefa
router.post("/addUser", signUp);

// TODO: add patch
router.patch("/:id", async (req, res, next) => {
  try {
    await Usuario.transaction(async (trx) => {
      const userPatch = await Usuario.query(trx).patchAndFetchById(
        req.params.id,
        req.body
      );
      res.json(userPatch);
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
