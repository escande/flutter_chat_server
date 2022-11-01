const {response} = require('express');
const { body } = require('express-validator');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario');

const crearUsuario = async (req, res = response) => {

    //Si el middleware es en el propio controlador
    // const errores =  validationResult(req);

    // if(!errores.isEmpty()){

    //     return res.status(400).json({
    //         ok: false,
    //         msg: errores.mapped()
    //     });
    // }
    const {email, password} = req.body;

    try{

        const existeEmail = await Usuario.findOne({email: email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Credeciales no validas'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar psw
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: usuario,
            token: token
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'El email ya existe'
        })
    }
}

const login = async (req, res = response) => {

    try{

        const {email, password} = req.body;

        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'Email no encontrado'
            });
        }

        //Validar usuario
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){

            return res.status(400).json({
                ok:false,
                msg: 'La contraseña no es valida'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'Login OK',
            userId: usuarioDB.id,
            token: token
        });

    }catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
}

const renewToken = async (req, res = response) => {

    const uid = req.uid

    //generar un nuevo JWT, generarJWT... uid...
    const token = await generarJWT(uid);
    console.log(token);

    //Obtener el usuario por el UID, Usuario.findById...
    const usuarioDB = await Usuario.findById(uid);


    res.json({
        ok: true,
        usuario: usuarioDB,
        token: token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}