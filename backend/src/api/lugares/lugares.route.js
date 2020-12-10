
const express = require('express');
const Lugar = require('./lugares.model');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const lugares = await Lugar.query().where('deleted_at', null);
        res.json(lugares);
    } catch (err) {
        next(err)
    }
})

module.exports = router;