const express = require('express');

const Empresa_owner = require('./empresa_owner.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const empresa_owner = await Empresa_owner.query();
        console.log('empresa owner es: ', empresa_owner)
        res.json(empresa_owner)
    } catch (err) {
        next(err);
    }
})

module.exports = router;