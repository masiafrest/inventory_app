const express = require("express");
const project = require("../constants/project");

const auth = require("./auth/auth.routes");
const recibos = require("./recibos");
const categoria = require("./categorias/categorias.routes");
const empresa_owner = require("./empresa_owner/empresa_owner.routes");
const usuarios = require("./usuarios/usuarios.routes");
const proveedores = require("./proveedors/proveedores.routes");
const precio_logs = require("./precio/logs/precio_logs.routes");
const item = require("./items/items.routes");
const lugar = require("./lugares/lugares.route");

const { checkToken } = require("../lib/helpers");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: project.message + " API route 👩",
  });
});
router.use("/recibos", recibos);
router.use("/precio_logs", precio_logs);
router.use("/auth", auth);
router.use("/categorias", categoria);
router.use("/items", checkToken, item);
router.use("/lugares", lugar);
router.use("/empresa_owner", empresa_owner);
router.use("/usuarios", checkToken, usuarios);
router.use("/proveedores", proveedores);
module.exports = router;
