const router = require("express").Router();
const items = require("./items.routes");
const inventarios = require("./inventarios/inventarios.routes");
const logs = require("./inventarios/logs/inventario_logs.routes");
const defectuosos = require("./inventarios/defectuosos/defectuosos.routes");

router.use("/", items);
router.use("/inventarios", inventarios);
router.use("/inventarios/logs", logs);
router.use("/inventarios/defectuosos", defectuosos);

module.exports = router;
