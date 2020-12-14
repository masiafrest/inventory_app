const Precio_log = require("./precio_logs.model");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  const historial = await Precio_log.query().withGraphFetched();
  res.json(historial);
});

module.exports = router;
