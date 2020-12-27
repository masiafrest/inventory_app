const express = require("express");
const Transferencia = require("./transferencias.model");
const { InvLogFactory, invModQty } = require("../recibo.helpers");
const Inventario = require("../../items/inventarios/inventarios.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const transferencias = await Transferencia.query();
    res.json(transferencias);
  } catch (err) {
    next(err);
  }
});

async function findInvByIdWhereLugar(id, lugar, trx) {
  return await Inventario.query(trx).findById(id).where("lugar_id", lugar);
}
router.post("/", async (req, res, next) => {
  try {
    // inv_id, qty, lugar_id, para hacer la transferencia
    await Transferencia.transaction(async (trx) => {
      await Promise.all(
        req.body.lineas.map(async (linea) => {
          const {
            inventario_id,
            item_id,
            qty,
            de_lugar_id,
            a_lugar_id,
            sku,
          } = linea;
          const invDeLugar = await Inventario.query(trx)
            .findById(inventario_id)
            .where("lugar_id", de_lugar_id);
          let invALugar = await Inventario.query(trx)
            .where({
              sku,
              item_id,
              lugar_id: a_lugar_id,
            })
            .first();

          //si no existe el lugar donde va se crea un inv con ese lugar qty en 0
          if (!invALugar) {
            const { color, sku, precio_id, item_id } = invDeLugar;
            invALugar = await Inventario.query(trx).insertGraph(
              {
                item_id,
                qty: 0,
                color,
                sku,
                lugares: [
                  {
                    id: linea.a_lugar_id,
                  },
                ],
                precio: {
                  id: precio_id,
                },
                logs: [
                  {
                    usuario_id: req.userData.id,
                    ajuste: linea.qty,
                    evento: "crear",
                  },
                ],
              },
              {
                relate: true,
              }
            );
          }
          // descontar y hacer historial del inventario
          //descontar inventario
          await invModQty(invDeLugar, qty, trx);
          await invModQty(invALugar, qty, trx);
          // hacer el inventario log
          let invLogA = [InvLogFactory(req.body, linea, "transferencia")];
          let invLogB = [
            InvLogFactory(req.body, linea, "transferencia", null, invALugar.id),
          ];
          await invDeLugar.$relatedQuery("logs", trx).insert(invLogA);
          await invALugar.$relatedQuery("logs", trx).insert(invLogB);
          res.json({
            invDeLugar,
            invALugar,
          });
        })
      );
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
