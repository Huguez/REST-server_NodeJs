const { Router } = require( 'express' )
const { check } = require('express-validator')
const { getUsers, putUser, postUser, deleteUser } = require('../controllers/user')
const { validarRole, validarEmail, validarExisteUser } = require('../helpers/db-validataros')

const { validarCampos, validarJWT, tieneRol, validarRol } = require( '../middlewares' )

const router = Router()

router.get( '/',[ validarJWT ], getUsers )

router.put( '/:id', [ 
   check( "id", "No es un id Valido" ).isMongoId(),
   check( "id" ).custom( validarExisteUser ),
   check( 'role' ).custom( validarRole ),
   validarCampos,
   validarJWT,
 ], putUser )

router.post( '/', [ 
   check( 'email', "El correo no es valido" ).isEmail(),
   check( 'email' ).custom( validarEmail ),
   check( 'name', "El nombre es obligatorio" ).not().isEmpty(),
   check( 'password', "El password es obligatorio" ).not().isEmpty(),
   check( 'password', "El password minimo de 6 caractares" ).isLength( { min: 6 } ),
   check( 'role' ).custom( validarRole ),
   validarCampos
], postUser )

router.delete( '/:id', [
   check( "id", "No es un id Valido" ).isMongoId(),
   check( "id" ).custom( validarExisteUser ),
   validarCampos,
   validarJWT,
   validarRol,
   tieneRol( 'ADMIN_ROLE', 'USER_ROLE' )
],  deleteUser )

module.exports = router;