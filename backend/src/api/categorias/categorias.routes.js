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
    const insertCategoria = await Categoria.query().insert(req.body);
    return res.json(insertCategoria);
  } catch (err) {
    next(err);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const { id, nombre } = req.body;
    await Categoria.transaction(async (trx) => {
      //revisar si nombre exite en la base dato
      const categoria = await Categoria.query(trx).where({ nombre });
      if (categoria.length > 0) {
        //si existe responder con error
        res.json("existe el nombre de la categoria");
      } else {
        //si no existe modificar el base dato
        const updatedCategoria = await Categoria.query(trx)
          .findById(id)
          .patch({ nombre })
          .returning("*");
        res.json(updatedCategoria);
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
