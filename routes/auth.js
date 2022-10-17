const { Router } = require( 'express' )
const { check } = require('express-validator')
const { login, renew } = require('../controllers/auth')
const { validarJWT } = require('../middlewares')
const { validarCampos } = require( '../middlewares/validarCampos' )

const router = Router()

router.post( '/login',[
   check( "email", "EL email es obligatorio" ).isEmail(),
   check( "password", "EL password es obligatorio" ).not().isEmpty(),
   validarCampos
],  login )

router.get( '/renew', [
   validarJWT,
   check( 'id_token', "El id_token es necesario" ).not().isEmpty(),
   validarCampos
], renew )


module.exports = router