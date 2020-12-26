const express = require("express");
const Inventario_log = require("../../items/inventarios/logs/inventario_logs.model");
const Venta = require("./ventas.model");
const { sumTotal, getPrecioId, checkPrice } = require("../recibo.helpers");

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("ventas get/", req.body);
  try {
    const ventas = await Venta.query();
    res.json(ventas);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const ventas = await Venta.query()
      .findById(req.params.id)
      .withGraphFetched("lineas");
    res.json(ventas ? ventas : "no existe ese recibo tipo ventas");
  } catch (err) {
    next(err);
  }
});
router.get("/cliente/:empresa_cliente_id", async (req, res, next) => {
  try {
    const { empresa_cliente_id } = req.params;
    const ventas = await Venta.query().where({ empresa_cliente_id });
    res.json(ventas);
  } catch (err) {
    next(err);
  }
});

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
      let encabezado = { ...req.body };
      let lineas = req.body.lineas;
      const pago = req.body.pago;
      delete encabezado.lineas;
      delete encabezado.pago;
      console.log("encabezado: ", encabezado);
      const venta = await Venta.query(trx).insert(encabezado);
      if (req.body.hasOwnProperty("lineas")) {
        // descontar la qty de inventario y agregar historial al inv_log y agregar venta.id a las lineas
        await Promise.all(
          // usamos Promise porq map a un array y en los callback hacer await hace q map regrese un array con objeto de promesa pendiente y no agregara sub_total, tax y total a req.body por q esta pendiente la promesa
          lineas.map(async (linea) => {
            const { precioDB, inventarioDb } = await getPrecioId(linea);
            //check is precio is above precio_min
            checkPrice(linea, precioDB, res);
            ventaTotal = sumTotal(linea, ventaTotal);
            // descontar y hacer historial del inventario
            //descontar inventario
            const result = inventarioDb.qty - linea.qty;
            await inventarioDb.$query(trx).patch({ qty: result });
            // hacer el inventario log
            await Inventario_log.query(trx).insert({
              inventario_id: linea.inventario_id,
              usuario_id: req.body.usuario_id,
              empresa_cliente_id: req.body.empresa_cliente_id,
              evento: "venta",
              ajuste: -linea.qty,
              venta_id: venta.id,
            });
          })
        );
      }
      // add tax and sub_total to req.body.total
      ventaTotal.total = ventaTotal.tax + ventaTotal.sub_total;
      encabezadox = { ...encabezado, ...ventaTotal };
      //objeto pasa por referencia al hacer map en un array q contiene objeto, modificas el obj osea la referencia
      lineas.map((linea) => {
        linea.venta_id = venta.id;
      });
      await venta.$query(trx).patch(encabezado);
      await venta.$relatedQuery("lineas", trx).insert(lineas);
      await venta.$relatedQuery("pago", trx).insert(pago);
      res.json(venta);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
