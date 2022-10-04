const { request, responce } = require( "express" )
const bcryptjs = require( "bcryptjs" )

const User = require( '../models/user' )

const getUser = ( req = request, res = responce ) => {
   try {
      return res.status( 200 ).json( {
         msg: "Hello GET!!!",
      } )
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( {
         msg: error
      } )
   }
}

const putUser = ( req = request, res = responce ) => {
   try {
      const { body:data, params:{ id } } = req
      const { wawa, tako } = req.query
      
      return res.status( 200 ).json( {
         msg: "Hello PUT!!!",
         user: { 
            id: Number( id ), 
            ...data, 
            wawa, 
            tako 
         }
      } )
   } catch ( error ) {
      return res.status( 500 ).json( {
         error
      } )
   }
}

const postUser = async ( req = request, res = responce ) => {
   try {
      const { google, ...resp } = req.body
      
      const usuario = new User( resp )
      
      const salt = bcryptjs.genSaltSync()
      usuario.password = bcryptjs.hashSync( resp.password, salt )

      await usuario.save()

      return res.status( 200 ).json( {
         msg: "Hello POST!!!",
         user: usuario,
      } )
   } catch ( error ) {
      return res.status( 500 ).json( {
         error
      } )
   }
}

const deleteUser = ( req = request, res = responce ) => {
   return res.status( 200 ).json( {
      msg: "Hello DELETE!!!",
   } )
}

module.exports = {
   getUser,
   putUser,
   postUser,
   deleteUser
}