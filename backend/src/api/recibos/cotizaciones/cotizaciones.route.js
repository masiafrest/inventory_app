const express = require('express');
const Cotizacion = require('./cotizaciones.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const cotizaciones = await Cotizacion.query();
        res.json(cotizaciones)
    } catch (err) {
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const cotizacionInserted = await Cotizacion.relatedQuery('lineas', trx)
            .for(1)
            .insert(
                req.body.lineas[0]
            )
        await Cotizacion.transaction(async trx => {
            console.log('cotizacion req', Cotizacion.tableName);
            /* const insertedCotizacion = await Cotizacion.query().insertGraph({
                encabezado: [
                    {
                        usuario_id: req.body.usuario_id,
                        empresa_cliente: req.body.empresa_cliente
                    }
                ],
                lineas: [
                    req.body.lineas[0]
                ],
                //total: req.body.total,
            }); */
            console.log('finish inserting...', cotizacionInserted);
        });
    } catch (err) {

    }
})

module.exports = router;