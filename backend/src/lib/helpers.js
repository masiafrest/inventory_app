const jwt = require("jsonwebtoken");
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

function skuGenerator(nombre, modelo, color, opcional = "") {
  const nom = nombre.slice(0, 3);
  const sku = `${nombre.slice(0, 3)}-${modelo.slice(0, 3)}-${color.slice(
    0,
    3
  )}${opcional ? "-" + opcional.slice(0, 3) : ""}`;
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
      result = await Model.query().where("nombre", value).first();
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}
module.exports = { checkToken, skuGenerator, findByIdOrName };
