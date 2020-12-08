const jwt = require('jsonwebtoken');

function sign(payload) {
    console.log('funciont sign jwt')
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRECT,
            {
                expiresIn: '1d'
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                return resolve(token);
            }
        )
    }
    )
}

module.exports = {
    sign
}