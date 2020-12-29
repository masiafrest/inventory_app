const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("./auth.controllers");

//el signup en front end lo usa desde el usuario con rol jefe
router.post("/signup", signUp);

router.post("/signin", signIn);
module.exports = router;
