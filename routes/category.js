const { Router } = require( 'express' )
// const { check } = require('express-validator')
const { getCategorys, getCategory, putCategory, postCategory, deleteCategory } = require('../controllers/category')
const { validarJWT } = require('../middlewares')

const router = Router()

router.post( '/',[ validarJWT ], postCategory )

router.get( '/',[ validarJWT ], getCategorys )

router.get( '/:id',[ validarJWT ], getCategory )

router.put( '/:id',[ validarJWT ], putCategory )

router.delete( '/:id',[ validarJWT ], deleteCategory )

module.exports = router