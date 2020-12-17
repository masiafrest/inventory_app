const router = require("express").Router();
const Item_inventario_log = require("../../logs/item/item_inventario_logs.model");

router.get("/", (req, res, next) => {
  res.send("item_inventarios");
});

router.post("/", (req, res, next) => {
  res.send("item_inventario");
});

router.patch("/:id", async (req, res, next) => {
  const { precio, qty, sku, color, basura } = req.body;
  try {
    await Item_inventario_log.transaction(async (trx) => {
      const insertItemInv = await Item_inventario_log.query(trx).upsertGraph(
        {}
      );
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
