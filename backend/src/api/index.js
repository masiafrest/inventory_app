const express = require('express');
const project = require('../constants/project');
const empresa_owner = require('./empresa_owner/empresa_owner.routes');
const usuarios = require('./usuarios/usuarios.routes');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: project.message + ' API route 👩'
    })
})

router.use('/empresa_owner', empresa_owner);
router.use('/usuarios', usuarios)

module.exports = router