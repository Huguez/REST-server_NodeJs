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
   validarCampos
], renew )


module.exports = router