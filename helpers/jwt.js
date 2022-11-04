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

const comprobarJWT = (token = '') => {

    try{

        if(!token){
            throw 'Unauthorize';
        }

        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        //req.uid = uid;

        return [true, uid];

    }catch(err){

        return [false, err];
    }

}

module.exports = {
    generarJWT,
    comprobarJWT
}