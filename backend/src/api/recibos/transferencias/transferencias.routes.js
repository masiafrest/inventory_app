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
          const { item_id, qty, destino_lugar_id } = linea;
          const itemOrigen = await Item.query(trx).findById(item_id);

          let itemDestino = await Item.query(trx)
            .where({
              sku: itemOrigen.sku,
              lugar_id: destino_lugar_id,
            })
            .first();

          //si no existe el lugar donde va se crea un item con ese lugar qty en 0
          if (!itemDestino) {
            const newItem = { ...itemOrigen }
            delete newItem.id
            delete newItem.lugar_id
            newItem.stock = 0;
            itemDestino = await Item.query(trx).insertGraph(
              {
                ...newItem,
                lugar: [
                  {
                    // se supone q ese lugar ya a sido creado
                    id: linea.destino_lugar_id,
                  },
                ],
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
          await itemModQty(itemOrigen, qty, trx);
          await itemModQty(itemDestino, -qty, trx);
          // hacer el item log
          let itemLogA = [ItemLogFactory(req.body, linea, "transferencia")];
          let itemLogB = [
            ItemLogFactory(
              req.body,
              linea,
              "transferencia",
              null,
              itemDestino.id
            ),
          ];
          await itemOrigen.$relatedQuery("logs", trx).insert(itemLogA);
          await itemDestino.$relatedQuery("logs", trx).insert(itemLogB);
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
