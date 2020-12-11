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

    } catch (err) {

    }
})

module.exports = router;