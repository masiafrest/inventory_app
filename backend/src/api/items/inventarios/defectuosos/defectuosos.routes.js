const router = require("express").Router();
const { InvLogFactory } = require("../../../recibos/recibo.helpers");
const { addToDefectuoso } = require("../../../recibos/recibos.controllers");
const Inventario_log = require("../logs/inventario_logs.model");
const Defectuoso = require("./defectuosos.model");

router.get("/", async (req, res, next) => {
  try {
    const defectuoso = await Defectuoso.query();
    res.json(defectuoso);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { inventario_id, descripcion } = req.body;
    await Defectuoso.transaction(async (trx) => {
      const defectuoso = await addToDefectuoso(req.body, trx);
      linea = {
        inventario_id,
        qty: 1,
      };
      const invLog = InvLogFactory(req.userData, linea, "defecto");
      await Inventario_log.query(trx).insert(invLog);
      res.json(defectuoso);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
