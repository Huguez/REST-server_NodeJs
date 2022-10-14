const { validarCampos } = require( './validarCampos' )
const { validarJWT    } = require('./validarJWT')
const { validarRol    } = require('./validarRol')
const { tieneRol      } = require( './tieneRol' )
const { validarFiles  } = require( './validarFiles' )

module.exports = {
   validarCampos,
   validarJWT,
   validarRol,
   tieneRol,
   validarFiles,
}