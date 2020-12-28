const Defectuoso = require("./defectuosos.model");

const router = require("express").Router();


router.get('/', async (req, res, next){
    try {
       const defectuoso = await Defectuoso.query();
       res.json(defectuoso);
    } catch (error) {
        next(error)    
    }
})

module.exports = router;