const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise( (resolve, reject) => {

        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {

            if(err){
                //No se pudo generar el token
                reject(err + 'No se pudo generar el JWT');
            }else{
                //token
                resolve(token);
            }
        });

    });
}

module.exports = {
    generarJWT
}