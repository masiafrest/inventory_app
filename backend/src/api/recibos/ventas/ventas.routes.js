const express = require("express");
const Inventario = require("../../items/inventarios/inventarios.model");
const Inventario_log = require("../../items/inventarios/logs/inventario_logs.model");
const Precio = require("../../precio/precios.model");

const Venta = require("./ventas.model");

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
    let sub_total = 0;
    let tax = 0;
    let total = 0;
    let error;

    //insertar la venta
    await Venta.transaction(async (trx) => {
      let encabezado = { ...req.body };
      let lineas = req.body.lineas;
      delete encabezado.lineas;
      const venta = await Venta.query(trx).insert(encabezado).returning("id");
      console.log("venta_id: ", venta);
      if (req.body.hasOwnProperty("lineas")) {
        console.log("has lineas");
        // descontar la qty de inventario y agregar historial al inv_log y agregar venta.id a las lineas
        await Promise.all(
          // usamos Promise porq map a un array y en los callback hacer await hace q map regrese un array con objeto de promesa pendiente y no agregara sub_total, tax y total a req.body por q esta pendiente la promesa
          lineas.map(async (linea) => {
            console.log("Map Linea ", linea.inventario_id);
            //limpiar precio para q tenga 2 decimales
            linea.precio = linea.precio.toFixed(2);
            //check is precio is above precio_min
            const inventarioDb = await Inventario.query().findById(
              linea.inventario_id
            );
            const precioDB = await Precio.query().findById(
              inventarioDb.precio_id
            );
            if (linea.precio < precioDB.oferta_precio) {
              res.status(406);
              error = new Error(
                `precio: ${linea.precio}, de inventario ${linea.inventario_id} debajo a la oferta: ${precioDB.oferta_precio}`
              );
              throw error;
            }
            if (
              linea.precio < precioDB.precio_min &&
              precioDB.oferta_precio == null
            ) {
              res.status(406);
              error = new Error(
                `precio: ${linea.precio}, de inventario ${linea.inventario_id} debajo al precio minimo: ${precioDB.precio_min}`
              );
              throw error;
            }
            //sum precio * qty and add to req.body.sub_total
            const lineaTotal = linea.precio * linea.qty;
            sub_total += lineaTotal;
            //sum tax to req.body.tax
            const notRoundedTax = (lineaTotal / 100) * 7;
            tax += Math.round((notRoundedTax + Number.EPSILON) * 100) / 100;
            // add tax and sub_total to req.body.total
            total += tax + sub_total;
            // descontar y hacer historial del inventario
            //descontar inventario
            const result = inventarioDb.qty - linea.qty;
            await inventarioDb.$query(trx).patch({ qty: result });
            // hacer el inventario log
            await Inventario_log.query(trx).insert({
              inventario_id: inventarioDb.id,
              usuario_id: req.body.usuario_id,
              empresa_cliente_id: req.body.empresa_cliente_id,
              evento: "venta",
              ajuste: -linea.qty,
              venta_id: venta.id,
            });
          })
        );
      }
      encabezado = { ...encabezado, sub_total, tax, total };
      lineas.map((linea) => {
        linea.venta_id = venta.id;
      });
      console.log("lineas: ", lineas);
      console.log("req.body.lineas: ", req.body.lineas);
      await venta.$query(trx).patch(encabezado);
      await venta.$relatedQuery("lineas", trx).insert(lineas);

      res.json(venta);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
