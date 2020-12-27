const express = require("express");

const Devolucion = require("./devoluciones.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const devoluciones = await Devolucion.query();
    res.json(devoluciones);
  } catch (err) {
    next(err);
  }
});

//TODO hacer post devolucion
// devolucion: item devuelto por efectivo o otro item
router.post("/", async (req, res, next) => {
  try {
    // TODO tal vez crear tabla de cliente_item_comprado, donde acumula los item comprado con columna cliente_id, inventario_id, qty, asi se resta de qty o suma, inv tal vez agregar columna en_reparacion
    res.json("post Devolucion ");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
