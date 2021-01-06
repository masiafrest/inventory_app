const jwt = require("jsonwebtoken");
const Usuario = require("../api/usuarios/usuarios.model");
const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearear = header.split(" ");
    const token = bearear[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decode;
    next();
  } else {
    res.sendStatus(403);
  }
};

function skuGenerator(marca, modelo, color, opcional = "") {
  const nom = marca.slice(0, 3);
  const sku = `${marca.slice(0, 3)}-${modelo.slice(0, 3)}-${color.slice(0, 3)}${
    opcional ? "-" + opcional.slice(0, 3) : ""
  }`;
  console.log(sku);
  return sku;
}

async function findByIdOrName(Model, value, res, next) {
  try {
    const paramType = isNaN(value);
    let result;
    if (!paramType) {
      result = await Model.query().findById(value);
    } else {
      let type = "marca";
      if (Model.name === "Usuario") {
        type = "nombre";
      }
      result = await Model.query().where(type, value).first();
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}
module.exports = { checkToken, skuGenerator, findByIdOrName };
