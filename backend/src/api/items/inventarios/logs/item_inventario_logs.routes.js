const Item_inventario_log = require("./item_inventario_logs.model");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  const historial = await Item_inventario_log.query().withGraphFetched(
    "[inventario, usuario(noPassword), proveedor]"
  );
  res.json(historial);
});

module.exports = router;
