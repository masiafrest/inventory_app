const router = require('express').Router
const Proveedores = require('./proveedores.model');

router.get('/', async (req, res, next) => {
    try {
        const proveedores = await Proveedores.query();
        res.json(proveedores);
    } catch (err) {
        next(err);
    }
})


module.exports = router;