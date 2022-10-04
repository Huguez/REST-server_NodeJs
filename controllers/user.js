const { request, responce } = require( "express" )
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
      const data = req.body
      const usuario = new User( data )

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