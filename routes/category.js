const { Router } = require( 'express' )
const { check } = require('express-validator')

const { getCategorys, getCategory, putCategory, postCategory, deleteCategory } = require('../controllers/category')
const { validarJWT, validarCampos } = require('../middlewares')
const {  existeCategoria } = require( '../helpers/db-validataros' )

const router = Router()

router.post( '/',[ 
   validarJWT,
   check( "name", "El nombre es obligatorio" ).not().isEmpty(),
   validarCampos
], postCategory )

router.get( '/', getCategorys )

router.get( '/:id',[ 
   check( "id", "No es un id de Mongo" ).isMongoId(),
   check( "id" ).custom( existeCategoria ),
   validarCampos,
], getCategory )

router.put( '/:id',[ 
   validarJWT,
   check( "name", "El nombre es obligatorio" ).not().isEmpty(), 
   check( "id" ).custom( existeCategoria ),
   validarCampos,
], putCategory )

router.delete( '/:id',[ 
   validarJWT,
   check( "id" ).custom( existeCategoria ),
   validarCampos,
], deleteCategory )

module.exports = router