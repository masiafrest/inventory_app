const express = require("express");
const Item = require("../../items/items.model");
const { ItemLogFactory } = require("../recibo.helpers");
const { itemModQty, getById } = require("../recibos.controllers");
const Transferencia = require("./transferencias.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const transferencias = await Transferencia.query().withGraphFetched(
      "[lineas.[origen, destino, item(getItemData)], usuario(getNameAndId)] "
    );
    res.json(transferencias);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  await getById(Transferencia, req.params.id, res, next);
});

router.post("/", async (req, res, next) => {
  try {
    // item_id, qty, lugar_id, para hacer la transferencia
    await Transferencia.transaction(async (trx) => {
      await Promise.all(
        req.body.lineas.map(async (linea) => {
          const { item_id, qty, destino_lugar_id, sku } = linea;
          const itemDeLugar = await IteItemm.query(trx).findById(item_id);

          let itemALugar = await Item.query(trx)
            .where({
              sku,
              item_id,
              lugar_id: destino_lugar_id,
            })
            .first();

          //si no existe el lugar donde va se crea un item con ese lugar qty en 0
          if (!itemALugar) {
            const { color, sku, precio_id, item_id } = itemDeLugar;
            itemALugar = await Item.query(trx).insertGraph(
              {
                item_id,
                stock: 0,
                color,
                sku,
                lugares: [
                  {
                    // se supone q ese lugar ya a sido creado
                    id: linea.destino_lugar_id,
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
          // descontar y hacer historial del item
          //descontar item
          await itemModQty(itemDeLugar, qty, trx);
          await itemModQty(itemALugar, -qty, trx);
          // hacer el item log
          let itemLogA = [ItemLogFactory(req.body, linea, "transferencia")];
          let itemLogB = [
            ItemLogFactory(
              req.body,
              linea,
              "transferencia",
              null,
              itemALugar.id
            ),
          ];
          await itemDeLugar.$relatedQuery("logs", trx).insert(itemLogA);
          await itemALugar.$relatedQuery("logs", trx).insert(itemLogB);
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
