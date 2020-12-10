const router = require('express').Router();
const Item = require('./items.model');

router.get('/', (req, res, next) => {
    try {

        res.send('item')
    } catch (err) {

    }
})

module.exports = router;