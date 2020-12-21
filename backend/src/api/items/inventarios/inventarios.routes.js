const router = require("express").Router();
const logs = require("./logs/inventario_logs.routes");

const Inventario = require("../inventarios/inventarios.model");

router.use("/logs", logs);

router.get("/", (req, res, next) => {
  res.send("inventarios");
});

router.post("/", (req, res, next) => {
  res.send("inventario");
});
//TODO resolver como ingresar o update precio y este automaticamente agrege a precio_log
router.patch("/:id", async (req, res, next) => {
  const { precio, qty, sku, color, basura } = req.body;
  try {
    await Inventario.transaction(async (trx) => {
      const insertItemInv = await Inventario.query(trx).upsertGraphAndFetch(
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
