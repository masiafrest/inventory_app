const express = require('express');

const Empresa_clientes = require('./empresa_clientes.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const empresa_clientes = await Empresa_clientes.query();
        res.json(empresa_clientes)
    } catch (err) {
        next(err);
    }
})

module.exports = router;