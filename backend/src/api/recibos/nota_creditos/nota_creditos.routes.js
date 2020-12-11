const express = require('express');

const Nota_credito = require('./nota_credito.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const nota_creditos = await Nota_credito.query();
        res.json(nota_creditos);
    } catch (err) {
        next(err);
    }
})

module.exports = router;