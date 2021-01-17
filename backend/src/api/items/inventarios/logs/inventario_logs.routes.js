const Item_inventario_log = require("./inventario_logs.model");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  const historial = await Item_inventario_log.query().withGraphFetched(
    "[inventario(getItemData), usuario(noPassword), proveedor, cliente(getName)]"
  );
  res.json(historial);
});

module.exports = router;
