const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;

    //console.log(usuario);

    await usuario.save();

    return usuario;
}

const usuarioDesconectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    usuario.online = false;

    await usuario.save();

    return usuario;

}


const grabarMensaje = async (payload) => {

    try{
         const mensaje = new Mensaje(payload);
         await mensaje.save();
         
        return true;
    }catch (err){
        return false;
    }
}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}