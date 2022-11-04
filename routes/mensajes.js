/*
    path: 'api/mensajes'

*/
const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {obtenerChat} = require('../controllers/mensajes');
const router = Router();

//Validar un JWT
router.get('/:de', validarJWT,obtenerChat);


module.exports = router;