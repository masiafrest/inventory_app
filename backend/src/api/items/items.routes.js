const router = require("express").Router();
const Item = require("./items.model");

router.get("/", (req, res, next) => {
  try {
    res.send("item");
  } catch (err) {}
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      nombre,
      descripcion,
      modelo,
      barcode,
      sku,
      categoria_id,
      qty,
      lugar_id,
      color,
      precio,
    } = req.body;
    const existingItem = await Item.query().where({ nombre }).first();
    console.log("this is auth existingItem", existingItem);
    if (existingItem) {
      const error = new Error("nombre en uso");
      res.status(403);
      throw error;
    }
    await Item.relatedQuery("categoria").res.send("items");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
