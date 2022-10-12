const { Router } = require( 'express' )
const { check } = require('express-validator')
const { search } = require('../controllers/busqueda')
const { validarCampos } = require('../middlewares')

const router = Router() 

router.get( '/:coleccion/:term', [
   check( "term", "El termino es obligatorio" ).not().isEmpty(),
   check( "coleccion", "El termino es obligatorio" ).not().isEmpty(),
   validarCampos,
], search )


module.exports = router