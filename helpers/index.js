const { 
   validarRole,
   validarEmail,
   validarExisteUser,
   existeCategoria,
   coleccionesPermitidas,
   existeProducto }  = require( "./db-validataros" )

   const { generarJWT }  = require( "./generarJWT" )

const { subirFile } = require( "./subirFile" )

module.exports = {
   validarRole,
   validarEmail,
   validarExisteUser,
   existeCategoria,
   existeProducto,
   generarJWT,
   subirFile,
   coleccionesPermitidas,
}