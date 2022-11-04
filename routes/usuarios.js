/*
    path: 'api/usuarios'

*/
const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {getUsuarios} = require('../controllers/usuarios');
const router = Router();

//Validar un JWT
router.get('/', validarJWT,getUsuarios);


module.exports = router;