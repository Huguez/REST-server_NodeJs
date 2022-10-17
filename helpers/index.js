const { 
   validarRole,
   validarEmail,
   validarExisteUser,
   existeCategoria,
   coleccionesPermitidas,
   existeProducto }  = require( "./db-validataros" )

   const { generarJWT, comprobarJWT }  = require( "./generarJWT" )

const { subirFile } = require( "./subirFile" )

module.exports = {
   validarRole,
   validarEmail,
   validarExisteUser,
   existeCategoria,
   existeProducto,
   generarJWT,
   comprobarJWT,
   subirFile,
   coleccionesPermitidas,
}