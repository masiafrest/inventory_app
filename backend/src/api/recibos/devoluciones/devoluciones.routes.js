const express = require('express');

const Devolucion = require('./devoluciones.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const devoluciones = await Devolucion.query();
        res.json(devoluciones)
    } catch (err) {
        next(err);
    }
})

module.exports = router;