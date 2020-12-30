const express = require("express");
const router = express.Router();
const { signUp } = require("../auth/auth.controllers");
const { findByIdOrName } = require("../../lib/helpers");

const Usuario = require("./usuarios.model");

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

router.patch("/:id", async (req, res, next) => {
  try {
    await Usuario.transaction(async (trx) => {
      if ("password" in req.body) {
        const bcrypt = require("bcrypt");
        const yup = require("yup");
        const yupSchema = require("yup")
          .object()
          .shape({
            password: yup
              .string()
              .min(6)
              .max(500)
              .matches(
                /[^A-Za-z0-9]/,
                "contraseña debe tener un caracter especial"
              )
              .matches(/[A-Z]/, "contraseña debe tener una Mayuscula")
              .matches(/[a-z]/, "contraseña debe tener minuscula")
              .matches(/[0-9]/, "contraseña debe tener numeros"),
          });
        await yupSchema.validate(req.body, { abortEarly: false });
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        req.body.password = hashedPassword;
      }
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
