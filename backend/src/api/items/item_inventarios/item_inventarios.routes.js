const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('item_inventarios')
})

router.post('/', (req, res, next) => {
    res.send('item_inventario');
})

module.exports = router;