const router = require("express").Router();
const Categoria = require("./categorias.model");

router.get("/", async (req, res, next) => {
  try {
    const categorias = await Categoria.query();
    res.json(categorias);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { nombre } = req.body;
    const insertCategoria = await Categoria.query().insert({ nombre });
    return res.json(insertCategoria);
  } catch (err) {
    next(err);
  }
});

module.exports = router;