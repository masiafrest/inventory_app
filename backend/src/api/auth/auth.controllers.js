const yupSchema = require("../../lib/yupSchema");

const jwt = require("../../lib/jwt");
const bcrypt = require("bcrypt");

const Usuario = require("../usuarios/usuarios.model");
const Empresa_owner = require("../empresa_owner/empresa_owner.model");

const errorMessages = {
  nameInUse: "nombre en uso",
  invalidLogin: "invalid login",
  emailInUse: "correo en uso",
};

exports.signUp = async (req, res, next) => {
  const {
    nombre,
    email,
    password,
    rol_id,
    image_url,
    telefono,
    telefono_2,
  } = req.body;
  try {
    const createUser = {
      ...req.body,
    };
    await yupSchema.validate(createUser, {
      abortEarly: false,
    });
    const existingUser = await Usuario.query().where("nombre", nombre).first();
    if (existingUser) {
      const error = new Error(errorMessages.nameInUse);
      res.status(403);
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const cello = await Empresa_owner.query().where("nombre", "cello").first();
    await Empresa_owner.transaction(async (trx) => {
      createUser.password = hashedPassword;
      const insertedUser = await Empresa_owner.relatedQuery("usuarios", trx)
        .for(cello.id)
        .insert(createUser);
      const payload = {
        id: insertedUser.id,
        nombre: nombre,
      };
      const token = await jwt.sign(payload);
      return res.json({
        user: payload,
        token,
      });
    });
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
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
};
