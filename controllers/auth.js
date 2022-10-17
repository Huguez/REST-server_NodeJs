const { request, responce } = require("express");
const bcryptjs = require( 'bcryptjs' )

const { User } = require( '../models' );
const { generarJWT } = require("../helpers/generarJWT");

const login = async ( req = request, res = responce ) => {
   try {
      const { email, password } = req.body
      
      const user = await User.findOne( { email } ) 

      if( !user ) {
         return res.status( 400 ).json( {
            msg: "email/password no son correctos !!!"
         } )
      }

      if( !user.state ) {
         return res.status( 400 ).json( {
            msg: "state en false "
         } )
      }

      const validarPass = bcryptjs.compareSync( password, user.password )
      if( !validarPass ){
         return res.status( 400 ).json( {
            msg: "Password esta mal carnal"
         } )
      }

      const token = await generarJWT( user.id )

      return res.status( 200 ).json({
         user,
         token,
      })
   } catch ( err ) {
      console.log( err );
      return res.status( 500 ).json({
         msg: "Hable con el admin"
      } )
   }
}

const renew = async ( req = request, res = responce ) => {
   try {
      const { user } = req

      const token = await generarJWT( user.id )

      return res.status( 200 ).json( {
         token,
         user
      } )
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( error )
   }
}

module.exports = {
   login,
   renew
}