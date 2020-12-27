const express = require("express");
const Venta = require("./ventas.model");
const {
  invModQty,
  sumTotal,
  getInvAndPrecioDB,
  getInvDB,
  getPrecioDB,
  checkPrice,
  InvLogFactory,
} = require("../recibo.helpers");

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
      let invLogs = [];
      let encabezado = { ...req.body };
      delete encabezado.lineas;
      delete encabezado.pago;
      const venta = await Venta.query(trx).insert(encabezado);
      if (req.body.hasOwnProperty("lineas")) {
        // descontar la qty de inventario y agregar historial al inv_log y agregar venta.id a las lineas
        await Promise.all(
          // usamos Promise porq map a un array y en los callback hacer await hace q map regrese un array con objeto de promesa pendiente y no agregara sub_total, tax y total a req.body por q esta pendiente la promesa
          req.body.lineas.map(async (linea) => {
            //TODO refactor tal vez una func getInvPrecioDB donde regresa uno o ambos invDB precioDB
            // const invDB = await getInvDB(linea);
            // const precioDB = await getPrecioDB(invDB);
            const { invDB, precioDB } = await getInvAndPrecioDB(linea);
            //check is precio is above precio_min
            checkPrice(linea, precioDB, res);
            ventaTotal = sumTotal(linea, ventaTotal);
            // descontar y hacer historial del inventario
            //descontar inventario
            await invModQty(invDB, linea.qty, trx);
            // hacer el inventario log
            invLogs.push(InvLogFactory(req.body, linea, "venta", venta.id));
          })
        );
      }
      // add tax and sub_total to req.body.total
      ventaTotal.total = ventaTotal.tax + ventaTotal.sub_total;
      //check if total is less than pago
      const pagoTotal = Object.values(req.body.pago)
        .reduce((acc, curVal) => {
          return acc + curVal;
        })
        .toFixed(2);
      console.log("pago total: ", pagoTotal, "venta total: ", ventaTotal.total);
      if (ventaTotal.total > pagoTotal) {
        const error = new Error("pago no es suficiente");
        throw error;
      }
      encabezado = { ...encabezado, ...ventaTotal };
      await venta.$query(trx).patch(encabezado);
      await venta.$relatedQuery("lineas", trx).insert(req.body.lineas);
      await venta.$relatedQuery("pago", trx).insert(req.body.pago);
      await venta.$relatedQuery("inv_logs", trx).insert(invLogs);
      res.json(venta);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
