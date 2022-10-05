const { Router } = require( 'express' )
const { check } = require('express-validator')
const { getUser, putUser, postUser, deleteUser } = require('../controllers/user')
const { validarRole } = require('../helpers/db-validataros')
const { validarCampos } = require( '../middlewares/validarCampos' )

const router = Router()

router.get( '/', getUser )

router.put( '/:id', putUser )

router.post( '/', [ 
   check( 'email', "El correo no es valido" ).isEmail(),
   check( 'name', "El nombre es obligatorio" ).not().isEmpty(),
   check( 'password', "El password es obligatorio" ).not().isEmpty(),
   check( 'password', "El password minimo de 6 caractares" ).isLength( { min: 6 } ),
   // check( 'role', "El rol no es valido" ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
   check( 'role' ).custom( validarRole ),
   validarCampos
], postUser )

router.delete( '/:id', deleteUser )

module.exports = router;