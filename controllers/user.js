const { request, responce } = require( "express" )
const bcryptjs = require( "bcryptjs" )

const User = require( '../models/user' )
const user = require("../models/user")

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

const putUser = async ( req = request, res = responce ) => {
   try {
      const { body:{ _id, password, google, email, ...rest }, params:{ id } } = req
      // const { wawa, tako } = req.query
      
      if( password ){
         const salt = bcryptjs.genSaltSync()
         rest.password = bcryptjs.hashSync( password, salt )
      }

      const usuario = await User.findByIdAndUpdate( id, rest )

      await usuario.save()
      const { google:auxG, __v, password:auxP, state, ...user } = usuario["_doc"]

      return res.status( 200 ).json( {
         user
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