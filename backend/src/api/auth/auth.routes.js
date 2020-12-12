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
    const { nombre, password, rol } = req.body;
    try {
        const crearUsuario = {
            nombre,
            password,
            rol
        }
        await yupSchema.validate(crearUsuario, {
            abortEarly: false
        })
        const existingUser = await Usuario.query().where({ nombre }).first();
        console.log('this is auth existingUser', existingUser)
        if (existingUser) {
            const error = new Error(errorMessages.nameInUse);
            res.status(403);
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const cello = await Empresa_owner.query().where('nombre', 'cello').first();

        await Empresa_owner.transaction(async trx => {
            const insertedUser = await Empresa_owner.relatedQuery('usuarios', trx)
                .for(cello.id).
                insert({
                    nombre, password: hashedPassword, rol
                })
            console.log('insertedUser: ', insertedUser)
            console.log('create payload obj')
            const payload = {
                id: insertedUser.id,
                nombre,
            }
            console.log('payload', payload)
            console.log('signing token payload')
            const token = await jwt.sign(payload);
            console.log('payload signed')
            return res.json({
                user: payload,
                token
            })
        })
    } catch (err) {
        next(err);
    }
})

router.get('/signin', async (req, res, next) => {
    const { nombre, password } = req.body
    try {
        await yupSchema.validate({
            nombre,
            password
        },
            {
                abortEarly: false,
            });

        const usuario = await Usuario.query().where({ nombre }).first();
        if (!usuario) {
            const error = new Error(errorMessages.invalidLogin);
            res.status(403);
            throw error;
        }
        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) {
            const error = new Error(errorMessages.invalidLogin);
            res.status(403);
            throw error;
        }
        const payload = {
            id: usuario.id,
            nombre: usuario.nombre,
            rol: usuario.rol
        }
        const token = await jwt.sign(payload);
        res.json({
            usuario: payload,
            token
        })

    } catch (err) {
        next(err);
    }
})
module.exports = router;