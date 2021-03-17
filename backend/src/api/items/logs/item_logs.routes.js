const Item_log = require("./item_logs.model");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  const historial = await Item_log.query().withGraphFetched(
    "[item(getItemData),  proveedor(getNameAndId), cliente(getNameAndId), usuario(getNameAndId)]"
  );
  res.json(historial);
});

module.exports = router;
