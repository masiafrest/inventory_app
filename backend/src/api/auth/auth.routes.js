const express = require("express");
const router = express.Router();
const { signUp } = require("./auth.controllers");

const errorMessages = {
  nameInUse: "nombre en uso",
  invalidLogin: "invalid login",
  emailInUse: "correo en uso",
};
//el signup en front end lo usa desde el usuario con rol jefe
router.post("/signup", signUp);

router.post("/signin", async (req, res, next) => {
  const { nombre, password } = req.body;
  try {
    await yupSchema.validate(
      {
        nombre,
        password,
      },
      {
        abortEarly: false,
      }
    );

    const usuario = await Usuario.query().where({ nombre }).first();
    if (!usuario) {
      const error = new Error(errorMessages.invalidLogin);
      res.status(403);
      throw error;
    }
    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      const error = new Error(errorMessages.invalidLogin);
      res.status(403);
      throw error;
    }
    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };
    const token = await jwt.sign(payload);
    res.json({
      usuario: payload,
      token,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
