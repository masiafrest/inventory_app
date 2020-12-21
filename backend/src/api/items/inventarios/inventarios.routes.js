const router = require("express").Router();
const logs = require("./logs/item_inventario_logs.routes");

const Item_inventario = require("../inventarios/inventarios.model");

router.use("/logs", logs);

router.get("/", (req, res, next) => {
  res.send("item_inventarios");
});

router.post("/", (req, res, next) => {
  res.send("item_inventario");
});
//TODO resolver como ingresar o update precio y este automaticamente agrege a precio_log
router.patch("/:id", async (req, res, next) => {
  const { precio, qty, sku, color, basura } = req.body;
  try {
    await Item_inventario.transaction(async (trx) => {
      const insertItemInv = await Item_inventario.query(
        trx
      ).upsertGraphAndFetch(
        {
          id: req.params.id,
          qty,
          sku,
          color,
          basura,
          precio: {
            id: precio.id,
            precio,
          },
        },
        { noDelete: true }
      );
      res.send(insertItemInv);
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
