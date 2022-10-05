const { response, request } = require('express')


const validarRol = ( req = request, res = response , next ) => {
   try {
      const userAuth = req.user
      if( !userAuth ){
         return res.status( 500 ).json( {
            msg: "Se quiere verificar el role sin validar el token primero"
         } )
      }

      const { role, name } = userAuth

      if( role !== 'ADMIN_ROLE' ){
         return res.status( 401 ).json( {
            msg: `el usuario ${ name } no es administrador`
         } )
      }
      
      next()

   } catch (error) {
      return res.status( 500 ).json({
         msg: "valifar Rol - hable con el admin"
      })
   }
}

module.exports = { validarRol }