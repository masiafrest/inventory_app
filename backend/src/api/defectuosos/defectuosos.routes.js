const router = require("express").Router();
const { ItemLogFactory } = require("../recibos/recibo.helpers");
const { addToDefectuoso } = require("../recibos/recibos.controllers");
const Defectuoso = require("./defectuosos.model");
const Item_log = require("../items/logs/item_logs.model");

router.get("/", async (req, res, next) => {
  try {
    const defectuoso = await Defectuoso.query()
      .join("item", "defectuoso.item_id", "=", "item.id")
      .select(
        "defectuoso.created_at",
        "defectuoso.descripcion",
        "item.sku",
        "item.color",
        "item.marca",
        "item.modelo"
      );
    res.json(defectuoso);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { item_id, descripcion } = req.body;
    await Defectuoso.transaction(async (trx) => {
      const defectuoso = await addToDefectuoso(req.body, trx);
      linea = {
        item_id,
        qty: 1,
      };
      const invLog = ItemLogFactory(req.userData, linea, "defecto");
      await Item_log.query(trx).insert(invLog);
      res.json(defectuoso);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
