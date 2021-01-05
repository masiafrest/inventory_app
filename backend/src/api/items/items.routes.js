const router = require("express").Router();
const upload = require("../../lib/upload");

const itemController = require("./items.controllers");

const inventarios = require("./inventarios/inventarios.routes");
router.use("/inventarios", inventarios);

router.get("/", itemController.get);
router.get("/:x", itemController.getByParams);
router.post("/", upload.array("images", 4), itemController.post);
router.patch("/", itemController.patch);

module.exports = router;
