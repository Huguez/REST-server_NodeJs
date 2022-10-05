const { request, responce } = require( "express" )
const bcryptjs = require( "bcryptjs" )

const User = require( '../models/user' )

const getUsers = async ( req = request, res = responce ) => {
   try {
      const { limite = 5, desde = 0 } = req.query
      
      // const usuarios = await User.find( { state: true } ).limit( Number( limite )  ).skip( Number( desde ) )

      const [ total, users ] = await Promise.all( [
         User.countDocuments( { state: true } ),
         User.find( { state: true } ).limit( Number( limite )  ).skip( Number( desde ) )
      ] )

      return res.status( 200 ).json( {
         total, 
         users
         // total: usuarios.length,
         // users: usuarios.map( u => ({ id: u._id, email: u.email, role: u.role }) ),
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

const deleteUser = async ( req = request, res = responce ) => {
   try{
      const { id } = req.params
      
      const usuario = await User.findByIdAndUpdate( id, { state: false } )

      return res.status( 200 ).json( {
         user: usuario
      } )
   } catch ( error ) {
      return res.status( 500 ).json( {
         error
      } )
   }
}

module.exports = {
   getUsers,
   putUser,
   postUser,
   deleteUser
}