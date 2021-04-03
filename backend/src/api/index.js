const express = require("express");
const project = require("../constants/project");

const auth = require("./auth/auth.routes");
const recibos = require("./recibos");
const categoria = require("./categorias/categorias.routes");
const empresa_owner = require("./empresa_owner/empresa_owner.routes");
const usuarios = require("./usuarios");
const proveedores = require("./proveedors/proveedores.routes");
const precio_logs = require("./precio/logs/precio_logs.routes");
const item = require("./items/");
const lugar = require("./lugares/lugares.route");
const cheques = require("./cheques/cheques.routes");
const clientes = require("./empresa_clientes/empresa_clientes.routes");
const defectuosos = require("./defectuosos/defectuosos.routes");

const { checkToken } = require("../lib/helpers");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: project.message + " API route 👩",
  });
});
router.use("/cheques", cheques);
router.use("/recibos", checkToken, recibos);
router.use("/precio_logs", precio_logs);
router.use("/auth", auth);
router.use("/categorias", categoria);
router.use("/items", checkToken, item);
router.use("/lugares", lugar);
router.use("/empresa_owner", empresa_owner);
router.use("/usuarios", checkToken, usuarios);
router.use("/proveedores", proveedores);
router.use("/clientes", clientes);
router.use("/defectuosos", checkToken, defectuosos);
module.exports = router;
