const { response, request } = require('express')
const jwt = require( 'jsonwebtoken' )
const { User } = require( '../models' )

const validarJWT = async ( req = request, res = response , next ) => {
   try {
      const token = req.header("x-token")
      const key = process.env.SECRET_KEY

      if ( !token ) {
         return res.status( 401 ).json( {
            msg: "No hay token carnal"
         } )   
      }
      
      const { id } = jwt.verify( token, key )

      const user = await User.findById( id )

      if( !user ){
         return res.status( 401 ).json( {
            msg: "Token - User no existe en BD"
         } )
      }
      
      if( !user.state ){
         return res.status( 401 ).json( {
            msg: "Token - User en false"
         } )
      }

      req.user = user
      
      next()
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( {
         msg: "Token - Hable con el admin"
      } )
   }

}

module.exports = { validarJWT }