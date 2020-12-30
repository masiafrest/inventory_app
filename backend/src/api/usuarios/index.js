const router = require("express").Router();
const usuarios = require("./usuarios.routes");
const roles = require("./roles/roles.routes");

router.use("/roles", roles);
router.use("/", usuarios);

module.exports = router;
