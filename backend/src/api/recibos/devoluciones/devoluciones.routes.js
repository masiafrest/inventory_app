const express = require('express');

const Devolucion = require('./devoluciones.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        //TODO probar agregando un recibo de encabezado y con lineas 
        const devoluciones = await Devolucion.query();
        res.json(devoluciones)
    } catch (err) {
        next(err);
    }
})

module.exports = router;