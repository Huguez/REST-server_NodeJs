const { response, request } = require('express')

const tieneRol = ( ...roles ) => {
   return ( req = request, res = response , next ) => {
      const { user } = req

      if( !roles.includes( user.role ) ) {
         return res.status( 401 ).json( {
            msg: `El servicio requiere uno de estos roles ${ roles.toString() }`
         } )
      }  

      next()
   }
}

module.exports = { tieneRol }