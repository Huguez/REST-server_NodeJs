const { validarCampos } = require( './validarCampos' )
const { validarJWT } = require('./validarJWT')
const { validarRol } = require('./validarRol')
const { tieneRol } = require( './tieneRol' )


module.exports = {
   validarCampos,
   validarJWT,
   validarRol,
   tieneRol
}