const router = require("express").Router();
const yupSchema = require("../../lib/yupSchema");
const Proveedor = require("./proveedores.model");

router.get("/", async (req, res, next) => {
  try {
    const proveedores = await Proveedores.query();
    res.json(proveedores);
  } catch (err) {
    next(err);
  }
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
