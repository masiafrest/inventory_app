const fs = require("fs");
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
  console.log(Model.name, value);
  try {
    const paramType = isNaN(value);
    let result;
    if (!paramType) {
      console.log("is number");
      result = await Model.query().findById(value);
    } else {
      let type = "nombre";
      result = await Model.query().where(type, value).first();
    }
    return result;
  } catch (error) {
    next(error);
  }
}

async function hardDeleteById(req, res, next, Model) {
  try {
    const { id } = req.params;
    console.log(id);
    await Model.transaction(async (trx) => {
      const model = await Model.query(trx).deleteById(id);
      console.log("hard Delete", model);
      res.json(model);
    });
  } catch (error) {
    next(error);
  }
}

async function delImg(paths) {
  const path = require("path");
  let imgPath;

  paths.map((element) => {
    imgPath = path.resolve("public", "uploads", element.url_path);
    console.log("imgs:, ", imgPath);
    try {
      if (fs.existsSync(imgPath)) {
        console.log("The file exists.");
        try {
          fs.unlinkSync(imgPath);
          //file removed
          console.log(imgPath, "archivo eliminado");
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log("The file does not exist.");
      }
    } catch (err) {
      console.error(err);
    }
  });
  console.log("delImg");
}

async function patchById(req, res, next, Model) {
  try {
    await Model.transaction(async (trx) => {
      const modelUpdated = await Model.query(trx).upsertGraph(
        { ...req.body },
        {
          noDelete: true,
        }
      );
      res.send(modelUpdated);
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkToken,
  skuGenerator,
  findByIdOrName,
  hardDeleteById,
  delImg,
  patchById,
};
