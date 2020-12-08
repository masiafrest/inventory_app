const express = require('express');
const yup = require('yup');

const jwt = require('../../lib/jwt')
const bcrypt = require('bcrypt');

const Usuario = require('../usuarios/usuarios.model');
const Empresa_owner = require('../empresa_owner/empresa_owner.model');

const router = express.Router();

const yupSchema = yup.object().shape({
    nombre: yup.string().trim().min(2).required(),
    email: yup.string().trim().email(),
    password: yup.string().min(6).max(500)
        .matches(/[^A-Za-z0-9]/, 'contraseña debe tener un caracter especial')
        .matches(/[A-Z]/, 'contraseña debe tener una Mayuscula')
        .matches(/[a-z]/, 'contraseña debe tener minuscula')
        .matches(/[0-9]/, 'contraseña debe tener numeros')
        .required(),
})

const errorMessages = {
    nameInUse: 'nombre en uso',
    invalidLogin: 'invalid login',
    emailInUse: 'correo en uso',
}
/**
 * @param {import('objection')} objection 
 */
router.post('/signup', async (req, res, next) => {
    const { nombre, password } = req.body;
    try {
        const crearUsuario = {
            nombre,
            password,
            //empresa_owner_id: 10
        }
        console.log(crearUsuario)
        await yupSchema.validate(crearUsuario, {
            abortEarly: false
        })
        // TODO check is user exist
        const existingUser = await Usuario.query().where({ nombre }).first();
        console.log('this is auth existingUser', existingUser)
        if (existingUser) {
            const error = new Error(errorMessages.nameInUse);
            res.status(403);
            throw error;
        }
        console.log('hashing password');
        const hashedPassword = await bcrypt.hash(password, 12);
        // TODO insert user
        //const cello = await Empresa_owner.query().where('nombre', 'cello');
        //console.log('cello: ', cello)
        console.log('inserting...')
        const insertedUserRelational = await Empresa_owner.query().insertGraph({
            nombre: 'cello',
            usuarios: [
                {
                    nombre,
                    password: hashedPassword,
                }
            ]
        })
        /*         const insertedUser = await Usuario.query().insert({
                    nombre,
                    password: hashedPassword
                }) */
        console.log('insertedUserRelational ', insertedUserRelational)
        //build token
        const payload = {
            id: insertedUserRelational.id,
            token,
        }
        console.log('signing token payload')
        const token = await jwt.sign(payload);
        console.log('payload signed')
        res.json({
            user: payload,
            token
        })
    } catch (err) {
        next(err);
    }
})

router.get('/signin', async (req, res, next) => {
    const { nombre, password } = req.body
    console.log('sign innnn');
    const usuarios = await Usuario.query();
    res.json({
        usuarios
    })
})
module.exports = router;