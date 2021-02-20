const router = require("express").Router();
const logs = require("./logs/inventario_logs.routes");
const Inventario = require("../inventarios/inventarios.model");
const { patchById, hardDeleteById } = require("../../../lib/helpers");

router.use("/logs", logs);

router.get("/", (req, res, next) => {
  res.send("inventarios");
});

router.get("/:item_id", async (req, res, next) => {
  const result = await Inventario.query()
    .where({ item_id: req.params.item_id })
    .withGraphFetched({
      precio: true,
      lugar: true,
    });
  res.json(result);
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
                  inventario_id: "#ref{inventario.id}",
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

router.patch("/", async (req, res, next) => {
  patchById(req, res, next, Inventario);
});

router.delete("/:id", (req, res, next) => {
  hardDeleteById(req, res, next, Inventario);
});

module.exports = router;
