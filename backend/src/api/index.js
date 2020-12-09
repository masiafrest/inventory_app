const express = require('express');
const project = require('../constants/project');

const auth = require('./auth/auth.routes');

const empresa_owner = require('./empresa_owner/empresa_owner.routes');
const usuarios = require('./usuarios/usuarios.routes');

const { checkToken } = require('../lib/helpers');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: project.message + ' API route 👩'
    })
})

router.use('/empresa_owner', empresa_owner);
router.use('/usuarios', checkToken, usuarios)
router.use('/auth', auth);
module.exports = router