const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearear = header.split(" ");
    const token = bearear[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode", decode);
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

module.exports = { checkToken, skuGenerator };
