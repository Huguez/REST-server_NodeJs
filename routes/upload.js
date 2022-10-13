const { Router } = require('express')
const { check } = require( 'express-validator' )
const { cargarArchivo } = require('../controllers/upload')

const { validarCampos, validarJWT } = require( '../middlewares' )

const router = Router()

router.post( "/", [
   validarJWT,
   // check( 'file', "el archivo es obligatorio" ).not().isEmpty(),
   // validarCampos
], cargarArchivo )


module.exports = router