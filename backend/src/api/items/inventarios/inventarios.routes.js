const router = require("express").Router();
const logs = require("./logs/inventario_logs.routes");

const Inventario = require("../inventarios/inventarios.model");

router.use("/logs", logs);

router.get("/", (req, res, next) => {
  res.send("inventarios");
});

router.post("/", (req, res, next) => {
  res.send("inventario");
});

module.exports = router;
