const express = require("express");
const project = require("../constants/project");

const auth = require("./auth/auth.routes");

const categoria = require("./categorias/categorias.routes");
const empresa_owner = require("./empresa_owner/empresa_owner.routes");
const usuarios = require("./usuarios/usuarios.routes");
const item = require("./items/items.routes");
const item_inventario = require("./items/item_inventarios/item_inventarios.routes");
const lugar = require("./lugares/lugares.route");
const contizacion = require("./recibos/cotizaciones/cotizaciones.route");

const { checkToken } = require("../lib/helpers");
const { route } = require("./recibos/cotizaciones/cotizaciones.route");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: project.message + " API route 👩",
  });
});
router.use("/categorias", categoria);
router.use("/auth", auth);
router.use("/cotizacion", contizacion);
router.use("/items", item);
router.use("/item_inventario", item_inventario);
router.use("/lugares", lugar);
router.use("/empresa_owner", empresa_owner);
router.use("/usuarios", checkToken, usuarios);
module.exports = router;
