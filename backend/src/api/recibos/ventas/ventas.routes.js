const express = require("express");
const Venta = require("./ventas.model");
const { sumTotal, checkPrice, ItemLogFactory } = require("../recibo.helpers");
const { itemModQty, getItemAndPrecioDB } = require("../recibos.controllers");
const Empresa_cliente = require("../../empresa_clientes/empresa_clientes.model");

const router = express.Router();
const graphFetched =
  "[lineas.item(getItemData), usuario(getNameAndId), cliente(getNameAndId)] ";
router.get("/", async (req, res, next) => {
  try {
    const ventas = await Venta.query().withGraphFetched(graphFetched);

    res.json(ventas);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  if (!isNaN(req.params.id)) {
    findById(req.params.id, res, next);
  } else {
    findByName(req.params.id, res, next);
  }
});

async function findById(id, res, next) {
  try {
    const ventas = await Venta.query()
      .findById(id)
      .withGraphFetched(graphFetched);
    res.json(ventas ? [ventas] : "no existe ese recibo tipo ventas");
  } catch (err) {
    next(err);
  }
}
async function findByName(nombre, res, next) {
  try {
    const cliente = await Empresa_cliente.query().where({ nombre });
    const ventas = await Venta.query()
      .where({
        empresa_cliente_id: cliente[0].id,
      })
      .withGraphFetched(graphFetched);
    res.json(ventas);
  } catch (err) {
    next(err);
  }
}

router.post("/", async (req, res, next) => {
  try {
    //resetear total, subtotal y tax a 0 para calcualr en el server
    let ventaTotal = {
      sub_total: 0,
      tax: 0,
      total: 0,
    };
    //insertar la venta
    await Venta.transaction(async (trx) => {
      const {
        empresa_cliente_id,
        usuario_id,
        lineas,
        total,
        sub_total,
        tax,
      } = req.body;
      let itemLogs = [];
      const ventaInstance = await Venta.query(trx).insert({
        usuario_id,
        empresa_cliente_id,
      });
      // descontar la qty de item y agregar historial al item_log y agregar venta.id a las lineas
      const venta = await Venta.query(trx).insertGraph(
        {
          "#id": "venta.id",
          usuario_id,
          empresa_cliente_id,
          sub_total,
          tax,
          total,
          lineas,
          item_logs: [],
        },
        {
          allowRefs: true,
        }
      );
      // await Promise.all(
      //   // usamos Promise porq map a un array y en los callback hacer await hace q map regrese un array con objeto de promesa pendiente y no agregara sub_total, tax y total a req.body por q esta pendiente la promesa
      //   lineas.map(async (linea) => {
      //     const { itemDB } = await getItemAndPrecioDB(linea);
      //     ventaTotal = sumTotal(linea, ventaTotal);
      //     // descontar y hacer historial del item
      //     //descontar item
      //     await itemModQty(itemDB, linea.qty, trx);
      //     // hacer el item log
      //     itemLogs.push({
      //       item_id: linea.id,
      //       usuario_id, empresa_cliente_id, evento: 'venta',
      //       ajuste: -linea.qty,
      //       recibo_evento_id: ventaInstance.id
      //     });
      //   })
      // );
      res.json(venta);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
