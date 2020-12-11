const express = require('express');

const Cheque = require('./cheques.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const cheques = await Cheque.query();
        res.json(cheques)
    } catch (err) {
        next(err);
    }
})

module.exports = router;