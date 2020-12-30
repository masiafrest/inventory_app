const express = require("express");
const { InvLogFactory, invModQty } = require("../recibo.helpers");
const { getById } = require("../recibos.controllers");
const Inventario = require("../../items/inventarios/inventarios.model");
const Transferencia = require("./transferencias.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const transferencias = await Transferencia.query();
    res.json(transferencias);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  await getById(Transferencia, req.params.id, res, next);
});

// FIXME: esta restando a los 2 item en inventario, uso correcto uno se resta y otro se agrega
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
          // borrar sku y item_id ya q no se necesita para insertar en recibo transferencia
          delete linea.sku;
          delete linea.item_id;
        })
      );
      //insert recibo trasnferencia
      const transferencia = await Transferencia.query(trx).insertGraph(
        req.body
      );
      res.json(transferencia);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
