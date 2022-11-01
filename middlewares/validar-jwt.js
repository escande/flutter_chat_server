
const jwt = require('jsonwebtoken');

const validarJWT = async (req, res, next) => {

    //leer token
    const token = req.header('x-token');

    console.log(token);

    try{

        if(!token){
            throw 'Unauthorize';
        }

        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();

    }catch(err){

        return res.status(401).json(
            {
                ok: false,
                msg: err
            }
        );
    }
}

module.exports = {
    validarJWT
}