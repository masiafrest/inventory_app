const Rol = require("./roles.model");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const roles = await Rol.query();
    res.json(roles);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await Rol.transaction(async (trx) => {
      const rolInserted = await Rol.query(trx).insert(req.body);
      res.json(rolInserted);
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
