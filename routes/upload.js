const { Router } = require('express')
const { check } = require( 'express-validator' )

const { cargarArchivo, putImgCloudinary, getImg } = require('../controllers/upload')

const { validarCampos, validarJWT, validarFiles } = require( '../middlewares' )

const { coleccionesPermitidas } = require( '../helpers' )

const router = Router()

router.post( "/", [
   validarJWT,
   validarFiles
], cargarArchivo )


router.put( '/:coleccion/:id', [
   validarJWT,
   check( "id", "El id no es valido" ).isMongoId(),
   check( 'coleccion' ).custom( c => coleccionesPermitidas( c, [ 'users', 'products', 'categorys' ] ) ),
   validarFiles,
   validarCampos
], putImgCloudinary )

router.get( '/:coleccion/:id', [
   validarJWT,
   check( "id", "El id no es valido" ).isMongoId(),
   check( 'coleccion' ).custom( c => coleccionesPermitidas( c, [ 'users', 'products', 'categorys' ] ) ),
   validarCampos
], getImg )

module.exports = router