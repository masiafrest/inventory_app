const router = require("express").Router();
const logs = require("./logs/inventario_logs.routes");

const Inventario = require("../inventarios/inventarios.model");

router.use("/logs", logs);

router.get("/", (req, res, next) => {
  res.send("inventarios");
});

router.get("/:id", async (req, res, next) => {
  const result = await Inventario.query()
    .findById(req.params.id)
    .join("item", { "inventario.item_id": "item.id" })
    .join("precio", { "inventario.precio_id": "precio.id" })
    .select("inventario.sku", "item.marca", "item.modelo", "precio.precio");
  // const item = await result.$relatedQuery("item").findById(result.item_id);
  res.json([result]);
});

router.post("/", (req, res, next) => {
  res.send("inventario");
});

module.exports = router;
