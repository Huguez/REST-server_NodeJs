const { Router } = require( 'express' )
const { check } = require( 'express-validator' )

const { getProduct, getProducts, postProduct, putProduct, deleteProduct } = require( '../controllers/producto' )

const { existeProducto } = require('../helpers/db-validataros')

const { validarCampos, validarJWT } = require('../middlewares')
const router = Router()

router.post( '/', [
   validarJWT,
   check( 'name', "El nombre es obligatorio" ).not().isEmpty(),
   check( 'categoria', "La categoria es obligatoria" ).not().isEmpty(),
   check( 'user', "El id del user es obligatorio" ).not().isEmpty(),
   check( 'precio', "El precio es obligatoria" ),
   check( 'descripcion', "La descripcion es obligatoria" ),
   check( 'disponibilidad', "La disponibilidad es obligatoria" ),
   validarCampos
], postProduct )

router.get( '/', getProducts )

router.get( '/:id', [
   check( 'id', "El id debe ser valido" ).isMongoId(),
   check( 'id' ).custom( existeProducto ),
   validarCampos,
], getProduct )

router.put( '/:id', [
   validarJWT,
   check( 'id' ).custom( existeProducto ),
   check( 'name', "El nombre es obligatorio" ).not().isEmpty(),
   check( 'categoria', "La categoria es obligatoria" ).not().isEmpty(),
   check( 'user', "El id del user es obligatorio" ).not().isEmpty(),
   check( 'precio', "El precio es obligatoria" ),
   check( 'descripcion', "La descripcion es obligatoria" ),
   check( 'disponibilidad', "La categoria es obligatoria" ),
   validarCampos
], putProduct )

router.delete( '/:id', [
   validarJWT,
   check( 'id', "El id debe ser uno valido" ).isMongoId(),
   check( 'id' ).custom( existeProducto ),
   validarCampos
], deleteProduct )

module.exports = router