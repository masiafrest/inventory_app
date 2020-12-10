const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('item_inventarios')
})

module.exports = router;