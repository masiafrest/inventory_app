const router = require("express").Router();
const { InvLogFactory } = require("../recibo.helpers");
const {
  itemModQty,
  addToDefectuoso,
  getItemDB,
  getById,
} = require("../recibos.controllers");

const { cloneDeep } = require("lodash");
const Devolucion = require("./devoluciones.model");
const Item_log = require("../../items/logs/item_logs.model");

router.get("/", async (req, res, next) => {
  try {
    const devoluciones = await Devolucion.query().withGraphFetched(
      "[lineas.[itemEntrada(getItemData), itemSalida(getItemData)], usuario(getNameAndId), cliente(getNameAndId)] "
    );
    res.json(devoluciones);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  await getById(Devolucion, req.params.id, res, next);
});

// devolucion: item devuelto por efectivo o otro item
// https://www.ejemplode.com/58-administracion/3158-ejemplo_de_nota_de_devolucion.html
router.post("/", async (req, res, next) => {
  try {
    await Devolucion.transaction(async (trx) => {
      const devolucion = await Devolucion.query(trx).insertGraph(req.body);
      await Promise.all(
        devolucion.lineas.map(async (linea) => {
          const {
            a_efectivo,
            qty,
            item_id,
            salida_item_id,
            motivo,
          } = linea;
          if (a_efectivo) {
            delete linea.a_efectivo;
          }
          if (salida_item_id) {
            //descontar el item dado al cliente, este caso otro_inv_id
            const invNuevo = await getItemDB(salida_item_id);
            await itemModQty(invNuevo, qty, trx);
          }
          if (!a_efectivo && !salida_item_id) {
            // cambiar por el mismo item, si otro_inv_id y efectivo es undefini
            const invDB = await getItemDB(item_id);
            await itemModQty(invDB, qty, trx);
            await devolucion
              .$relatedQuery("lineas", trx)
              .patch({ salida_item_id: item_id });
          }
          //agregar a item defectuoso a tabla defectuoso
          await addToDefectuoso(linea, trx);
          //hacer el log
          const itemLog = InvLogFactory(
            req.body,
            linea,
            "devolucion",
            devolucion.id
          );
          //insertar invLog
          const a = await Item_log.query(trx).insert(itemLog);
        })
      );
      res.json(devolucion);
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
