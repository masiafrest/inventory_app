const router = require("express").Router();
const yupSchema = require("../../lib/yupSchema");
const Proveedor = require("./proveedores.model");
const { findByIdOrName } = require("../../lib/helpers");

router.get("/", async (req, res, next) => {
  try {
    const proveedores = await Proveedor.query();
    res.json(proveedores);
  } catch (err) {
    next(err);
  }
});

router.get("/:x", async (req, res, next) => {
  const result = await findByIdOrName(Proveedor, req.params.x, res, next);
  res.json([result]);
});

router.post("/", async (req, res, next) => {
  try {
    await yupSchema.validate(req.body, {
      abortEarly: false,
    });

    const proveedorInserted = await Proveedor.query().insert(req.body);
    res.json(proveedorInserted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
