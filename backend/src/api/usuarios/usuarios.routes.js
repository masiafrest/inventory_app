const express = require('express');

const Usuario = require('./usuarios.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const usuarios = await Usuario.query().where('deleted_at', null);
        res.json(usuarios);
    } catch (err) {
        next(err)
    }
})


module.exports = router;