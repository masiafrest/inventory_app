const router = require("express").Router();
const usuarios = require("./usuarios.routes");
const roles = require("./roles/roles.routes");

router.use("/", usuarios);
router.use("/roles", roles);

module.exports = router;
