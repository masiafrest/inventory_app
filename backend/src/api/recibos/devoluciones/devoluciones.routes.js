const router = require("express").Router();
const {
  addToDefectuoso,
  invModQty,
  getInvDB,
  InvLogFactory,
} = require("../recibo.helpers");
const { cloneDeep } = require("lodash");
const Devolucion = require("./devoluciones.model");
const Inventario_log = require("../../items/inventarios/logs/inventario_logs.model");

router.get("/", async (req, res, next) => {
  try {
    const devoluciones = await Devolucion.query();
    res.json(devoluciones);
  } catch (err) {
    next(err);
  }
});

// TODO: add get by id

// devolucion: item devuelto por efectivo o otro item
// https://www.ejemplode.com/58-administracion/3158-ejemplo_de_nota_de_devolucion.html
router.post("/", async (req, res, next) => {
  try {
    await Devolucion.transaction(async (trx) => {
      const insertGraphData = cloneDeep(req.body);
      insertGraphData.lineas.map((linea) => {
        delete linea.estado;
        delete linea.lugar_id;
      });
      const devolucion = await Devolucion.query(trx).insertGraph(
        insertGraphData
      );
      await Promise.all(
        req.body.lineas.map(async (linea) => {
          const {
            a_efectivo,
            qty,
            inventario_id,
            salida_inventario_id,
            lugar_id,
            estado,
            descripcion,
          } = linea;
          if (a_efectivo) {
            delete linea.a_efectivo;
          }
          if (salida_inventario_id) {
            //descontar el item dado al cliente, este caso otro_inv_id
            const invNuevo = await getInvDB(salida_inventario_id);
            await invModQty(invNuevo, qty, trx);
          }
          if (!a_efectivo && !salida_inventario_id) {
            // cambiar por el mismo item, si otro_inv_id y efectivo es undefini
            const invDB = await getInvDB(inventario_id);
            await invModQty(invDB, qty, trx);
          }
          //agregar a item defectuoso a tabla defectuoso
          await addToDefectuoso(linea, trx);
          //hacer el log
          const invLog = InvLogFactory(
            req.body,
            linea,
            "devolucion",
            devolucion.id
          );
          //insertar invLog
          const a = await Inventario_log.query(trx).insert(invLog);
        })
      );
      res.json(devolucion);
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
