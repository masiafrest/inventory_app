const router = require("express").Router();
const items = require("./items.routes");

router.use("/", items);

module.exports = router;
