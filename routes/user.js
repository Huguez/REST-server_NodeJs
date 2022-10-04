const { Router } = require( 'express' )
const { check } = require('express-validator')
const { getUser, putUser, postUser, deleteUser } = require('../controllers/user')
const router = Router()

router.get( '/', getUser )

router.put( '/:id', putUser )

router.post( '/', [ check( 'email', "El correo no es valido" ).isEmail() ], postUser )

router.delete( '/:id', deleteUser )

module.exports = router;