const express = require("express");
const { getById } = require("../recibos.controllers");
const Linea_venta = require("../ventas/linea_ventas.model");
const Venta = require("../ventas/ventas.model");
const Garantia = require("./garantias.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const garantias = await Garantia.query().withGraphFetched(
      "[lineas.item(getItemData), usuario(getNameAndId), cliente(getNameAndId)] "
    );
    res.json(garantias);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  await getById(Garantia, req.params.id, res, next);
});

router.post("/", async (req, res, next) => {
  try {
    await Garantia.transaction(async (trx) => {
      const { empresa_cliente_id } = req.body;
      await Promise.all(
        req.body.lineas.map(async (linea) => {
          const { item_id, venta_id } = linea;
          if (venta_id) {
            //check is the client is in the venta recibo
            const venta = await Venta.query().findById(venta_id);
            if (venta.empresa_cliente_id !== empresa_cliente_id) {
              res.status(406);
              const error = new Error(
                `el recibo de venta id: ${venta_id}, no es de este cliente id: ${empresa_cliente_id}`
              );
              throw error;
            }
            //check is item exist on linea venta, (meaning is been sold to that client)
            const lineasVentas = await Linea_venta.query().where({
              venta_id,
              item_id,
            }); //this will return array
            if (lineasVentas.length === 0) {
              res.status(406);
              const error = new Error(
                `este recibo de venta no tiene este item id: ${item_id} ,listado`
              );
              throw error;
            }
            for (const line of lineasVentas) {
              if (line.item_id !== item_id) {
                res.status(406);
                const error = new Error(
                  "este recibo de venta no tiene este item listado"
                );
                throw error;
              }
            }
          }
        })
      );
      const post = await Garantia.query(trx).insertGraph(req.body);
      res.json(post);
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
