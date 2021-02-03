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

router.post("/", async (req, res, next) => {
  try {
    const {
      qty,
      color,
      sku,
      lugar_id,
      precio,
      precio_min,
      costo,
      item_id,
      proveedor_id,
    } = req.body;
    await Inventario.transaction(async (trx) => {
      const inventario = await Inventario.query(trx).insertGraph(
        {
          "#id": "inventario",
          item_id,
          qty,
          color,
          sku,
          lugar: [
            {
              id: lugar_id,
            },
          ],
          precio: [
            {
              precio,
              precio_min,
              costo,
              proveedor: [
                {
                  id: proveedor_id,
                },
              ],
              logs: [
                {
                  inventario_id: "#ref{inventario.id",
                  usuario_id: req.userData.id,
                  proveedor: [{ id: proveedor_id }],
                },
              ],
            },
          ],
          logs: [
            {
              usuario_id: req.userData.id,
              ajuste: qty,
              evento: "crear",
              proveedor: [{ id: proveedor_id }],
            },
          ],
        },
        { relate: true, allowRefs: true }
      );
      res.json(inventario);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
