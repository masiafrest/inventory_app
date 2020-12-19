const express = require("express");
const project = require("../constants/project");

const auth = require("./auth/auth.routes");

const categoria = require("./categorias/categorias.routes");
const empresa_owner = require("./empresa_owner/empresa_owner.routes");
const usuarios = require("./usuarios/usuarios.routes");
const proveedores = require("./proveedors/proveedores.routes");
const precio_logs = require("./precio/logs/precio_logs.routes");
const item = require("./items/items.routes");
const item_inventario = require("./items/inventarios/inventarios.routes");
const item_inventario_log = require("./items/inventarios/logs/item_inventario_logs.routes");
const lugar = require("./lugares/lugares.route");
const contizacion = require("./recibos/cotizaciones/cotizaciones.routes");

const { checkToken } = require("../lib/helpers");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: project.message + " API route 👩",
  });
});
router.use("/precio_logs", precio_logs);
router.use("/auth", auth);
router.use("/categorias", categoria);
router.use("/cotizacion", contizacion);
router.use("/items", checkToken, item);
router.use("/item_inventario", item_inventario);
router.use("/item_inventario_logs", item_inventario_log);
router.use("/lugares", lugar);
router.use("/empresa_owner", empresa_owner);
router.use("/usuarios", checkToken, usuarios);
router.use("/proveedores", proveedores);
module.exports = router;
