const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');

const router = express.Router();

const schema = yup.object().shape({
    nombre: yup.string().trim().min(2).required();
    email: yup.string().trim().email(),
    password: yup.string().min(6).max(500)
        .matches(/[^A-Za-z0-9]/, 'contraseña debe tener un caracter especial')
        .matches(/[A-Z]/, 'contraseña debe tener una Mayuscula')
        .matches(/[a-z]/, 'contraseña debe tener minuscula')
        .matches(/[0-9]/, 'contraseña debe tener numeros')
        .required(),
})

const errorMessages = {
    invalidLogin: 'invalid login',
    emailInUse: 'correo en uso',
}

router.post('/signup', async (req, res, next) => {
    const { nombre, password } = req.body;
    try {
        const crearUsuario = {
            nombre,
            password
        }
        await schema.validate(crearUsuario, {
            abortEarly: false
        })
        // TODO check is user exist
        const hashedPassword = await bcrypt.hash(password, 12);
        // TODO insert user
    } catch (err) {
        next(err);
    }
})
module.exports = router;